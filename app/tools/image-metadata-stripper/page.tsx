import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
export const metadata: Metadata = {
  title: 'Image Metadata Stripper — Free Online Tool',
  description: 'Remove EXIF, GPS, and meta tags from images for privacy. 100% client-side — your photos never leave your browser.',
};

export default function ImageMetadataStripperPage() {
  return (
    <>
      <SchemaMarkup
        toolName="Image Metadata Stripper"
        toolDescription="Remove EXIF, GPS, and meta tags from images for privacy. 100% client-side — your photos never leave your browser."
        toolUrl="/tools/image-metadata-stripper"
        faqs={[
          {
            question: 'What is image metadata (EXIF data)?',
            answer: 'Metadata, or EXIF data, is information embedded directly within an image file when it is captured or edited. This can include sensitive details such as the exact GPS coordinates where the photo was taken, camera model and settings, software details, and the date and time.',
          },
          {
            question: 'Why should I strip metadata from my images?',
            answer: 'Sharing images with embedded metadata can expose your privacy, including your location, home address, or identity. Stripping EXIF data before uploading photos to websites or social media platforms helps protect your personal information.',
          },
          {
            question: 'Are my photos sent to a server for processing?',
            answer: 'No. This tool runs entirely client-side. The metadata extraction and removal process happens in your browser, meaning your images never leave your local device.',
          },
        ]}
      />

      <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <header className="text-center mb-8">
          <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Remove EXIF, GPS, and meta tags from images for privacy. 100% client-side — your photos never leave your browser.
          </p>
        </header>
        <div className="animate-card-in">
          <ComingSoon toolName="Image Metadata Stripper" description="Remove EXIF, GPS, and meta tags from images for privacy. 100% client-side — your photos never leave your browser." />
        </div>
      </div>
    </main>
    </>
  );
}
