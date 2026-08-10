export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    // Fallback
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textarea);
      return success;
    } catch (e) {
      console.error("Clipboard copy fallback failed", e);
      return false;
    }
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error("Clipboard API write failed", e);
    return false;
  }
}

export async function shareToolUrl(slug: string, title: string): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  const url = window.location.href;
  const shareData = { title, url };

  // Prefer native share sheet on capable devices (mobile, supported desktops)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err) {
      // User cancelled the share sheet — treat as silent no-op success
      if (err && typeof err === "object" && "name" in err && err.name === "AbortError") {
        return true;
      }
      // Real failure (e.g., permission) — fall through to clipboard
      console.warn("navigator.share failed, falling back to clipboard", err);
    }
  }

  // Fallback: copy URL to clipboard
  return await copyToClipboard(url);
}

export function triggerPrint(): void {
  if (typeof window === "undefined") return;
  window.print();
}
