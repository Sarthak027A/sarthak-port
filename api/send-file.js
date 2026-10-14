// Vercel serverless function: POST /api/send-file  { fileId, email, website? }
// Emails the requested portfolio file to the visitor (as an attachment plus a
// view link) and sends the site owner a short "file requested" notification.
//
// Required environment variables (Vercel → Project → Settings → Environment Variables):
//   GMAIL_USER          the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD  a Google "App password" for that account (not the normal password)
// Optional:
//   NOTIFY_EMAIL        where request notifications go (defaults to GMAIL_USER)
//   SITE_URL            public site origin (defaults to https://sarthak-port.vercel.app)
//   MAIL_DRY_RUN=1      build the messages without sending (local testing)

const nodemailer = require("nodemailer");
const FILES = require("../src/config/files.json");

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

function visitorHtml(file, viewUrl) {
  return `<!doctype html><html><body style="margin:0;background:#000;padding:32px 16px;font-family:Inter,Helvetica,Arial,sans-serif;color:#f0f0f0">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
  <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;border:1px solid #292d30;border-radius:16px">
    <tr><td style="padding:32px">
      <p style="margin:0 0 24px;font-family:Menlo,monospace;font-size:12px;color:#a1a4a5;text-transform:uppercase;letter-spacing:.08em">Sarthak Anand</p>
      <h1 style="margin:0 0 16px;font-size:24px;font-weight:500;color:#fff">${escapeHtml(file.title)}</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:#a1a4a5">Thanks for your interest — the file you requested is attached. You can also view it online:</p>
      <a href="${viewUrl}" style="display:inline-block;border:1px solid #292d30;border-radius:6px;padding:12px 16px;color:#fff;text-decoration:none;font-size:14px">View online &rsaquo;</a>
      <p style="margin:32px 0 0;font-size:14px;line-height:1.5;color:#a1a4a5">If you'd like to talk about it, just reply to this email.</p>
      <p style="margin:8px 0 0;font-size:14px;color:#f0f0f0">— Sarthak Anand</p>
    </td></tr>
  </table>
  </td></tr></table></body></html>`;
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
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!dryRun && (!user || !pass)) {
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
  const from = `"Sarthak Anand" <${user || "dry-run@example.com"}>`;
  const notify = process.env.NOTIFY_EMAIL || user;

  try {
    const sent = await transporter.sendMail({
      from,
      to,
      replyTo: notify || undefined,
      subject: file.subject,
      text: `Thanks for your interest — ${file.title} is attached.\n\nView online: ${viewUrl}\n\nIf you'd like to talk about it, just reply to this email.\n— Sarthak Anand`,
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
