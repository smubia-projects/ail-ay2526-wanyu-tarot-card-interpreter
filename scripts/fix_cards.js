const fs = require('fs');
const p = 'data/cards.json';
let lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
let fixes = 0;
for (let i = 0; i < lines.length - 2; i++) {
  if (lines[i+1].trim() === '' && /^\"/.test(lines[i+2].trim())) {
    let j = i;
    while (j >= 0 && /^[ \t]*\}[ \t]*$/.test(lines[j])) j--;
    if (j < i) {
      let last = j + 1;
      if (!/\},\s*$/.test(lines[last])) {
        lines[last] = lines[last].replace(/\}([ \t]*)$/, '},');
        fixes++;
      }
      i = last + 2;
    }
  }
}
fs.writeFileSync(p, lines.join('\n'));
console.log('Fixed', fixes, 'occurrences');
