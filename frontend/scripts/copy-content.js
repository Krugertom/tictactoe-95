import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../../content');
const targetDir = join(__dirname, '../public/content');

try {
  // Ensure target directory exists
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  // Copy content directory
  if (existsSync(sourceDir)) {
    cpSync(sourceDir, targetDir, { recursive: true });
    console.log('✓ Content files copied to public/content');
  } else {
    console.warn('⚠ Source content directory not found:', sourceDir);
  }
} catch (error) {
  console.error('✗ Error copying content files:', error.message);
  process.exit(1);
}
