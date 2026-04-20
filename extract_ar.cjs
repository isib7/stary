const fs = require('fs');
const content = fs.readFileSync('src/data/stories/story1_horror.js', 'utf8');

// Find all matches of `ar: () => ""` or `ar: (v) => ""` or `ar: () => \`\` ` etc.
let arabics = [];
const regex = /ar:\s*\([^)]*\)\s*=>\s*`([^`]+)`/g;
let match;
while ((match = regex.exec(content)) !== null) {
  arabics.push(match[1]);
}
fs.writeFileSync('arabic_only.txt', arabics.join('\n\n====\n\n'));
console.log('Extracted ' + arabics.length + ' strings.');
