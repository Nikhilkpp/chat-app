import fs from 'fs';
import path from 'path';

const directoryToScan = './b/routes'; // change this if your backend routes are elsewhere

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const suspiciousPatterns = [
    /\/:\s*[,\/]?/,      // colon followed by nothing or just comma or slash, i.e. "/:" or "/:,"
    /\/:[^a-zA-Z0-9_]/,  // colon followed by non-alphanumeric param name (empty or invalid)
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      console.log(`⚠️ Suspicious pattern found in ${filePath}`);
    }
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.js')) {
      scanFile(fullPath);
    }
  }
}

scanDirectory(directoryToScan);
console.log('Scan complete.');
