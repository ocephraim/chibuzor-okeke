import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Button from "../ui/Button";

export function useCopyEmail() {
  const EMAIL = "ocephraim@gmail.com";
  const [copied, setCopied] = useState(false);
  const resetTimerRef = useRef(null);

  const copyToClipboard = useCallback(async (text) => {
    // Preferred: modern async clipboard API (requires secure context in most browsers)
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    // Fallback: execCommand-based copy for older browsers / non-secure contexts
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await copyToClipboard(EMAIL);
      setCopied(true);

      toast.success((t) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4.8rem",
          }}
        >
          Email copied!
          <Button
            variation="tertiary"
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
              toast.dismiss(t.id);
            }}
            style={{ color: "var(--color-text-dark)" }}
          >
            Open Mail App
          </Button>
        </span>
      ));

      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => setCopied(false), 1200);
    } catch (error) {
      setCopied(false);
      toast.error("Failed to copy email");
      console.error("Failed to copy email:", error);
    }
  }, [copyToClipboard]);

  useEffect(() => {
    async function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      const isCopyShortcut = (e.metaKey || e.ctrlKey) && key === "k";

      if (!isCopyShortcut) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      await handleCopyEmail();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(resetTimerRef.current);
    };
  }, [handleCopyEmail]);

  return { copied, handleCopyEmail, EMAIL };
}
