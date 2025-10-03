/**
 * Deletes duplicated 'ref-*' spec files from cypress/e2e.
 * Run: node tools/cleanup-ref-specs.js
 */
const fs = require('fs');
const path = require('path');

const e2eDir = path.join(process.cwd(), 'cypress', 'e2e');
if (!fs.existsSync(e2eDir)) {
  console.error('Directory not found:', e2eDir);
  process.exit(1);
}

const files = fs.readdirSync(e2eDir);
const targets = files.filter(f => /^ref-.*\.cy\.js$/i.test(f));

if (targets.length === 0) {
  console.log('No ref-* specs found. Nothing to delete.');
  process.exit(0);
}

for (const f of targets) {
  const full = path.join(e2eDir, f);
  try {
    fs.unlinkSync(full);
    console.log('Deleted', full);
  } catch (e) {
    console.error('Failed to delete', full, e.message);
  }
}
console.log('Done.');
