const fs = require('fs');
const s = fs.readFileSync('data/cards.json','utf8');
const lines = s.split(/\r?\n/);
let depth = 0;
const starts = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  if (trimmed === '{') { depth++; continue; }
  if (depth === 1 && /^\s*"[^"]+"\s*:\s*\{/.test(line)) { starts.push(i); }
  const opens = (line.match(/\{/g) || []).length;
  const closes = (line.match(/\}/g) || []).length;
  depth += opens - closes;
}
if(starts.length===0) { console.error('No top-level keys found'); process.exit(1); }
const blocks = [];
for(let k=0;k<starts.length;k++){
  const start = starts[k];
  const end = (k+1<starts.length)? starts[k+1]-1 : lines.length-1; // up to closing brace
  const block = lines.slice(start,end+1).join('\n').trim();
  blocks.push(block);
}
const out = ['{', blocks.join(',\n\n'), '}', ''].join('\n');
fs.writeFileSync('data/cards.json', out);
console.log('Rebuilt file with', blocks.length, 'top-level entries');
