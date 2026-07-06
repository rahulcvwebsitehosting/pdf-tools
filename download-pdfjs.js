const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'public', 'js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

async function download(url, dest) {
  console.log(`Downloading ${url} to ${dest}...`);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`Successfully saved ${dest}`);
}

async function main() {
  try {
    await download(
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
      path.join(jsDir, 'pdf.min.js')
    );
    await download(
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
      path.join(jsDir, 'pdf.worker.min.js')
    );
    console.log('PDF.js assets downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PDF.js assets:', error);
    process.exit(1);
  }
}

main();
