import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Eye, Mail, X } from "lucide-react";
import { FILES, SITE } from "@/config/site";

const PdfViewer = lazy(() => import("./PdfViewer"));

const FileGateContext = createContext(() => {});
export const useFileGate = () => useContext(FileGateContext);

const officeEmbed = (path) =>
  `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(window.location.origin + encodeURI(path))}`;

const EmailForm = ({ fileId, onViewInstead }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");
  const honeypot = useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/send-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId, email, website: honeypot.current?.value || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't send the email.");
      setStatus("sent");
    } catch (err) {
      setMessage(err.message === "Failed to fetch" ? "Couldn't reach the server." : err.message);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex items-start gap-3 rounded-md border border-[var(--hairline)] p-4" role="status" data-testid="email-sent">
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--green)]" />
        <div>
          <p className="text-sm text-[var(--white)]">Sent — check your inbox.</p>
          <p className="mt-1 font-mono text-xs text-[var(--iris)]">{email}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3" data-testid="email-form">
      <label htmlFor="gate-email" className="text-sm text-[var(--ash)]">
        Send it to my email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="gate-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus-ring min-w-0 flex-1 rounded-md border border-[var(--hairline)] bg-transparent px-3 py-3 font-mono text-sm text-[var(--white)] placeholder:text-[var(--iron)] focus:border-[var(--iron)] focus:outline-none"
          data-testid="email-input"
        />
        {/* Honeypot — hidden from people, filled by bots */}
        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" className="btn-ghost" disabled={status === "sending"} data-testid="email-submit">
          <Mail size={15} strokeWidth={1.5} />
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
      <p className="text-xs leading-[1.5] text-[var(--iron)]">
        Sent personally from <span className="font-mono text-[var(--iris)]">{SITE.email}</span> — one email, no mailing list.
      </p>
      {status === "error" && (
        <p className="text-sm text-[var(--red)]" role="alert" data-testid="email-error">
          {message}{" "}
          <button type="button" onClick={onViewInstead} className="underline underline-offset-2 hover:text-[var(--white)]">
            View it here instead
          </button>
        </p>
      )}
    </form>
  );
};

const Viewer = ({ file }) =>
  file.type === "pdf" ? (
    <Suspense fallback={<p className="py-20 text-center font-mono text-xs text-[var(--ash)]">Loading viewer…</p>}>
      <PdfViewer src={file.path} />
    </Suspense>
  ) : (
    <iframe title={file.title} src={officeEmbed(file.path)} className="h-full w-full border-0 bg-white" data-testid="xlsx-viewer" />
  );

const FileModal = ({ fileId, startInViewer, onClose }) => {
  const file = FILES[fileId];
  const [mode, setMode] = useState(startInViewer ? "view" : "choose");
  const closeRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const viewing = mode === "view";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 backdrop-blur-sm sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={file.title}
      data-testid="file-modal"
    >
      <div
        className={`card flex w-full flex-col overflow-hidden ${
          viewing ? "h-full max-w-5xl rounded-none sm:h-[92vh] sm:rounded-2xl" : "mx-4 max-w-lg"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-[var(--hairline)] px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            {viewing && !startInViewer && (
              <button onClick={() => setMode("choose")} className="focus-ring rounded text-[var(--ash)] hover:text-[var(--white)]" aria-label="Back">
                <ArrowLeft size={18} strokeWidth={1.5} />
              </button>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--white)]">{file.title}</p>
              <p className="font-mono text-xs uppercase text-[var(--ash)]">{file.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {viewing && (
              <button onClick={() => setMode("email")} className="btn-ghost !px-3 !py-2" aria-label="Email me a copy" data-testid="viewer-email-button">
                <Mail size={14} strokeWidth={1.5} /> <span className="hidden sm:inline">Email me a copy</span>
              </button>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              className="focus-ring rounded p-1 text-[var(--ash)] hover:text-[var(--white)]"
              aria-label="Close"
              data-testid="file-modal-close"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {viewing ? (
          <div className="min-h-0 flex-1 bg-[var(--lift)]">
            <Viewer file={file} />
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-6 sm:p-8">
            <button
              onClick={() => setMode("view")}
              className="group flex items-center justify-between rounded-md border border-[var(--hairline)] p-4 text-left transition-colors duration-150 hover:border-[var(--iron)] focus-ring"
              data-testid="gate-view-button"
            >
              <span className="flex items-center gap-3">
                <Eye size={18} strokeWidth={1.5} className="text-[var(--ash)]" />
                <span>
                  <span className="block text-sm text-[var(--white)]">View on this site</span>
                  <span className="block text-xs text-[var(--ash)]">Opens instantly, nothing to download</span>
                </span>
              </span>
              <ArrowRight size={16} strokeWidth={1.5} className="text-[var(--ash)] transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>

            <div className="flex items-center gap-3 font-mono text-xs text-[var(--iron)]">
              <span className="h-px flex-1 bg-[var(--hairline)]" /> or <span className="h-px flex-1 bg-[var(--hairline)]" />
            </div>

            <EmailForm fileId={fileId} onViewInstead={() => setMode("view")} />
          </div>
        )}
      </div>
    </div>
  );
};

export const FileGateProvider = ({ children }) => {
  const [state, setState] = useState(null);

  const open = useCallback((fileId) => FILES[fileId] && setState({ fileId, direct: false }), []);
  const close = useCallback(() => {
    setState(null);
    const url = new URL(window.location.href);
    if (url.searchParams.has("view")) {
      url.searchParams.delete("view");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    }
  }, []);

  // Links in the emails point at /?view=<fileId> — open straight into the viewer.
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("view");
    if (id && id !== "_note" && FILES[id]) setState({ fileId: id, direct: true });
  }, []);

  return (
    <FileGateContext.Provider value={open}>
      {children}
      {state && (
        <FileModal key={state.fileId} fileId={state.fileId} startInViewer={state.direct} onClose={close} />
      )}
    </FileGateContext.Provider>
  );
};
