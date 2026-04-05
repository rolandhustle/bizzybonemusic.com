const https = require('https');
const fs = require('fs');
const path = require('path');

const covers = [
  {
    filename: 'heavenz-movie.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/73/Bizzy_Bone_-_Heaven%27z_Movie.jpg/220px-Bizzy_Bone_-_Heaven%27z_Movie.jpg',
  },
  {
    filename: 'e-1999-eternal.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/E._1999_Eternal.jpg/220px-E._1999_Eternal.jpg',
  },
  {
    filename: 'the-gift.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/Bizzy_Bone_The_Gift.jpg/220px-Bizzy_Bone_The_Gift.jpg',
  },
  {
    filename: 'the-art-of-war.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Bone_Thugs-n-Harmony_-_The_Art_of_War.jpg/220px-Bone_Thugs-n-Harmony_-_The_Art_of_War.jpg',
  },
  {
    filename: 'carbon-monoxide.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Bizzy_Bone_-_Carbon_Monoxide.jpg/220px-Bizzy_Bone_-_Carbon_Monoxide.jpg',
  },
  {
    filename: 'bone-brothers.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6e/Bone_Brothers_Album.jpg/220px-Bone_Brothers_Album.jpg',
  },
  {
    filename: 'faces-of-death.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Faces_of_death_alternate.jpg',
  },
  {
    filename: 'creepin-on-ah-come-up.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/4/4b/Creepin_on_ah_come_up.jpg',
  },
  {
    filename: 'btnhresurrection.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/7/78/Btnhresurrection.jpg',
  },
  {
    filename: 'double-r.jpg',
    url: '', // no public image available
  },
  {
    filename: 'alpha-and-omega.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/e/e5/BizzyBone_Alpha.gif',
  },
  {
    filename: 'speaking-in-tongues.jpg',
    url: 'https://upload.wikimedia.org/wikipedia/en/5/5a/Bizzy_Bone_Speaking.jpg',
  },
  {
    filename: 'tha-waste-lands.jpg',
    url: '',
  },
  {
    filename: 'bizzy-bone-2024.jpg',
    url: '',
  },
  {
    filename: 'the-book-of-bryon.jpg',
    url: '',
  },
];

const coversDir = path.join(__dirname, '..', 'public', 'covers');
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://en.wikipedia.org/',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: HEADERS }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        file.close();
        fs.unlink(dest, () => {});
        download(res.headers.location, dest, redirects + 1).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        // Validate it's actually an image (at least 5KB)
        const stats = fs.statSync(dest);
        if (stats.size < 5000) {
          fs.unlink(dest, () => {});
          reject(new Error(`File too small (${stats.size} bytes) — likely an error page`));
        } else {
          resolve();
        }
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading cover art...');
  for (const cover of covers) {
    const dest = path.join(coversDir, cover.filename);
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      if (stats.size > 5000) {
        console.log(`  ✓ ${cover.filename} (already exists)`);
        continue;
      }
      // File exists but is too small — delete and re-download
      fs.unlinkSync(dest);
    }
    try {
      await download(cover.url, dest);
      console.log(`  ✓ Downloaded ${cover.filename}`);
    } catch (err) {
      console.warn(`  ⚠ Failed to download ${cover.filename}: ${err.message}`);
    }
    // Polite delay between requests
    await sleep(1500);
  }
  console.log('Done.');
}

main();
