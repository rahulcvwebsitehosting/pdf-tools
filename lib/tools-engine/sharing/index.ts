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

export function shareToolUrl(slug: string, title: string): void {
  if (typeof navigator === "undefined") return;
  const shareData = {
    title: title,
    url: window.location.href,
  };
  if (navigator.share) {
    navigator.share(shareData).catch((err) => {
      console.warn("Share sheet interaction canceled or failed", err);
    });
  } else {
    // Fallback: Copy URL to clipboard
    copyToClipboard(window.location.href).then((ok) => {
      if (ok) {
        alert("Tool link copied to clipboard!");
      }
    });
  }
}

export function triggerPrint(): void {
  if (typeof window === "undefined") return;
  window.print();
}
