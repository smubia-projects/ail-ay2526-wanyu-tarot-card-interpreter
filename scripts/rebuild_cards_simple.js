const fs = require('fs');
const p='data/cards.json';
const lines = fs.readFileSync(p,'utf8').split(/\r?\n/);
const starts = [];
for(let i=0;i<lines.length;i++){
  if(lines[i].startsWith('"')) starts.push(i);
}
if(starts.length===0) { console.error('No starts'); process.exit(1); }
const blocks = [];
for(let k=0;k<starts.length;k++){
  const start=starts[k];
  const end = (k+1<starts.length)? starts[k+1]-1 : lines.length-1;
  blocks.push(lines.slice(start,end+1).join('\n').trim());
}
const out = '{\n' + blocks.join(',\n\n') + '\n}\n';
fs.writeFileSync(p,out);
console.log('Rebuilt with',blocks.length,'entries');
