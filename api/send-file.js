// Vercel serverless function: POST /api/send-file  { fileId, email, website? }
// Emails the requested portfolio file to the visitor (as an attachment plus a
// view link) and sends the site owner a short "file requested" notification.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   GMAIL_APP_PASSWORD  a Google "App password" for the sending Gmail account
// The mail is sent through Gmail itself, so it arrives genuinely "from"
// sarthakanand.sp01@gmail.com (signed by Google — no spoofing, no third party).
// Optional:
//   GMAIL_USER          sending address (defaults to sarthakanand.sp01@gmail.com)
//   NOTIFY_EMAIL        where request notifications go (defaults to GMAIL_USER)
//   SITE_URL            public site origin (defaults to https://sarthak-port.vercel.app)
//   MAIL_DRY_RUN=1      build the messages without sending (local testing)

const nodemailer = require("nodemailer");
const FILES = require("../src/config/files.json");

const OWNER = {
  name: "Sarthak Anand",
  email: "sarthakanand.sp01@gmail.com",
  phone: "+91 92637 76530",
  linkedin: "https://www.linkedin.com/in/sarthak-anand-668a17258/",
};
const SITE_URL = (process.env.SITE_URL || "https://sarthak-port.vercel.app").replace(/\/$/, "");
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i;
const MIME = {
  pdf: "application/pdf",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

// Best-effort abuse guard; resets when the function instance is recycled.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(key) {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Deliberately plain, personal-letter styling: no banners, no tracking pixels,
// no link shorteners — it should read like a note from a person, not a campaign.
function visitorText(file, viewUrl) {
  const site = SITE_URL.replace(/^https?:\/\//, "");
  return `Hi,

Thanks for your interest — here is the ${file.title} you requested on my portfolio (${site}). The file is attached, and you can also view it online here:
${viewUrl}

Happy to walk you through it or answer any questions — just reply to this email.

Best regards,
${OWNER.name}
${OWNER.email} · ${OWNER.phone}
${OWNER.linkedin}

—
You're receiving this one-time email because this address was entered on ${site} to request this file. If that wasn't you, you can ignore it; you won't be contacted again.`;
}

function visitorHtml(file, viewUrl) {
  const site = SITE_URL.replace(/^https?:\/\//, "");
  const p = 'style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#1f2328"';
  return `<!doctype html><html><body style="margin:0;padding:24px 16px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
  <div style="max-width:560px">
    <p ${p}>Hi,</p>
    <p ${p}>Thanks for your interest — here is the <strong>${escapeHtml(file.title)}</strong> you requested on my portfolio (<a href="${SITE_URL}" style="color:#0969da">${site}</a>). The file is attached, and you can also <a href="${viewUrl}" style="color:#0969da">view it online</a>.</p>
    <p ${p}>Happy to walk you through it or answer any questions — just reply to this email.</p>
    <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#1f2328">Best regards,<br><strong>${OWNER.name}</strong><br>
      <span style="color:#57606a">${OWNER.email} · ${OWNER.phone}</span><br>
      <a href="${OWNER.linkedin}" style="color:#0969da">LinkedIn</a></p>
    <p style="margin:32px 0 0;padding-top:16px;border-top:1px solid #d0d7de;font-size:12px;line-height:1.5;color:#6e7781">You're receiving this one-time email because this address was entered on ${site} to request this file. If that wasn't you, you can ignore it — you won't be contacted again.</p>
  </div></body></html>`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const { fileId, email, website } = body || {};

  // Honeypot: real visitors never fill the hidden "website" field.
  if (website) return res.status(200).json({ ok: true });

  const file = typeof fileId === "string" && fileId !== "_note" ? FILES[fileId] : null;
  if (!file) return res.status(400).json({ error: "Unknown file." });

  const to = typeof email === "string" ? email.trim() : "";
  if (!EMAIL_RE.test(to) || to.length > 254) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip) || rateLimited(to.toLowerCase())) {
    return res.status(429).json({ error: "Too many requests — please try again in a few minutes." });
  }

  const dryRun = process.env.MAIL_DRY_RUN === "1";
  const user = process.env.GMAIL_USER || OWNER.email;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!dryRun && !pass) {
    return res.status(503).json({ error: "Email delivery isn't set up yet." });
  }

  const fileUrl = `${SITE_URL}${encodeURI(file.path)}`;
  const viewUrl = `${SITE_URL}/?view=${encodeURIComponent(fileId)}`;

  let content;
  try {
    const r = await fetch(fileUrl);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    content = Buffer.from(await r.arrayBuffer());
  } catch (err) {
    console.error("send-file: could not load", fileUrl, err);
    return res.status(502).json({ error: "Couldn't load the file — please try again." });
  }

  const transporter = dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  const from = { name: OWNER.name, address: user };
  const notify = process.env.NOTIFY_EMAIL || user;

  try {
    const sent = await transporter.sendMail({
      from,
      to,
      replyTo: notify || undefined,
      subject: file.subject,
      text: visitorText(file, viewUrl),
      html: visitorHtml(file, viewUrl),
      attachments: [{ filename: file.path.split("/").pop(), content, contentType: MIME[file.type] }],
    });

    if (notify) {
      // Lead notification — awaited (serverless instances freeze after responding),
      // but a failure here must not fail the visitor's request.
      try {
        await transporter.sendMail({
          from,
          to: notify,
          replyTo: to,
          subject: `Portfolio: ${to} requested ${file.title}`,
          text: `${to} requested "${file.title}" by email from your portfolio.\nTime: ${new Date().toISOString()}\nReply to this email to contact them.`,
        });
      } catch (err) {
        console.error("send-file: notify failed", err);
      }
    }

    return res.status(200).json(dryRun ? { ok: true, dryRun: true, message: JSON.parse(sent.message) } : { ok: true });
  } catch (err) {
    console.error("send-file: send failed", err);
    return res.status(502).json({ error: "Couldn't send the email — please try again or view it here." });
  }
};
