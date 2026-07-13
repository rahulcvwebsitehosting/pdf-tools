import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "File Converter",
  description:
    "Universal online file converter. Convert images, audio, video, documents, archives, fonts and more — 100% in your browser.",
};

export default function ConverterPage() {
  return (
    <div className="w-full" style={{ height: "calc(100vh - 180px)" }}>
      <iframe
        src="/converter/index.html"
        className="w-full h-full border-0 rounded-lg"
        title="File Converter"
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}
