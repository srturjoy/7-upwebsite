const fs = require('fs');
const https = require('https');
const path = require('path');

const teamImages = [
  {
    filename: 'siddiqur-rahman-turjoy.webp',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop'
  },
  {
    filename: 'joynal-abedin-joy.webp',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop'
  },
  {
    filename: 'mohidul-islam-sojib.webp',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop'
  },
  {
    filename: 'abir-islam-joy.webp',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
  },
  {
    filename: 'azom.webp',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop'
  }
];

const dir = path.join(process.cwd(), 'public', 'images', 'team');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

teamImages.forEach(({ filename, url }) => {
  const filePath = path.join(dir, filename);
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      const fileStream = fs.createWriteStream(filePath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded ${filename}`);
      });
    } else {
      console.error(`Failed to download ${filename}: Status ${res.statusCode}`);
    }
  }).on('error', (err) => {
    console.error(`Error downloading ${filename}:`, err.message);
  });
});
