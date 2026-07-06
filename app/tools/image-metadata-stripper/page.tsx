import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';
import { SchemaMarkup } from '@/components/schema-markup';
import { AeoSection } from '@/components/aeo-section';

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

      <main className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10">
            <h1 className="text-4xl sm:text-5xl font-editorial text-foreground">
              Image Metadata Stripper
            </h1>
            <p className="mt-3 text-muted-foreground text-lg">
              Remove EXIF, GPS, and meta tags from images for privacy.
            </p>
          </header>

          <ComingSoon
            toolName="Image Metadata Stripper"
            description="Remove EXIF, GPS, and meta tags from images for privacy."
          />

          <AeoSection
            toolName="Image Metadata Stripper"
            whatIs="An Image Metadata Stripper is a utility designed to clean and sanitize image files by removing metadata tags like EXIF, IPTC, XMP, and GPS. These hidden tags are automatically embedded by digital cameras and smartphones. Clearing this metadata ensures that your privacy is protected and reduces the overall file size of the image."
            howToUse={[
              'Upload or drag and drop your image file (JPEG, PNG, WebP) into the upload area.',
              'The tool will detect and display any embedded metadata present in the file.',
              'Click "Strip Metadata" to generate a clean version of the image without any privacy-compromising tags, and download it to your device.'
            ]}
            whyClientSide="Photos contain deeply personal details, including location history and timestamps. Processing them on a remote server introduces security risks and privacy concerns. By stripping metadata client-side, the file never travels across the internet, guaranteeing complete data sovereignty and privacy."
          />
        </article>
      </main>
    </>
  );
}
