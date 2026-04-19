const fs = require('fs');
const txt = fs.readFileSync('src/data/stories/story2_mystery.js', 'utf8');

// Extract all node ids
const idMatches = txt.match(/\bid:\s*'([^']+)'/g) || [];
const ids = new Set(idMatches.map(m => m.replace(/.*'/, '').replace("'", '')));

// Extract all next targets
const nextMatches = txt.match(/\bnext:\s*'([^']+)'/g) || [];
const nexts = [...new Set(nextMatches.map(m => m.replace(/.*'/, '').replace("'", '')))];

console.log('\n=== MISSING NODES (referenced but not defined) ===');
nexts.forEach(n => { if (!ids.has(n)) console.log('MISSING:', n); });

console.log('\n=== ALL IDs ===');
[...ids].sort().forEach(id => console.log(id));
