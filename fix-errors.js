import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      if (fullPath.endsWith('.tsx')) results.push(fullPath);
    }
  });
  return results;
}

const files = walk('./src');
let modifiedCount = 0;

const regexes = [
  { from: /don't/gi, to: "don&apos;t" },
  { from: /doesn't/gi, to: "doesn&apos;t" },
  { from: /doesn’t/gi, to: "doesn&apos;t" },
  { from: /don’t/gi, to: "don&apos;t" },
  { from: /isn't/gi, to: "isn&apos;t" },
  { from: /aren't/gi, to: "aren&apos;t" },
  { from: /can't/gi, to: "can&apos;t" },
  { from: /couldn't/gi, to: "couldn&apos;t" },
  { from: /wouldn't/gi, to: "wouldn&apos;t" },
  { from: /shouldn't/gi, to: "shouldn&apos;t" },
  { from: /won't/gi, to: "won&apos;t" },
  { from: /there's/gi, to: "there&apos;s" },
  { from: /here's/gi, to: "here&apos;s" },
  { from: /let's/gi, to: "let&apos;s" },
  { from: /you're/gi, to: "you&apos;re" },
  { from: /we're/gi, to: "we&apos;re" },
  { from: /they're/gi, to: "they&apos;re" },
  { from: /I'm/gi, to: "I&apos;m" },
  { from: /it's/gi, to: "it&apos;s" },
  { from: /that's/gi, to: "that&apos;s" },
  { from: /what's/gi, to: "what&apos;s" },
  { from: /who's/gi, to: "who&apos;s" },
  { from: /manufacturer's/gi, to: "manufacturer&apos;s" },
  { from: /client's/gi, to: "client&apos;s" },
  { from: /door phone's/gi, to: "door phone&apos;s" },
  { from: /door's/gi, to: "door&apos;s" },
  { from: /visitor's/gi, to: "visitor&apos;s" },
  { from: /Children's/gi, to: "Children&apos;s" },
  { from: /company's/gi, to: "company&apos;s" },
  { from: /resident's/gi, to: "resident&apos;s" },
  { from: /You'd/gi, to: "you&apos;d" },
  { from: /you'd/gi, to: "you&apos;d" },
  { from: /InfySmart's/gi, to: "InfySmart&apos;s" },
  { from: /InfySmart Solutions'/gi, to: "InfySmart Solutions&apos;" },
  { from: /years'/gi, to: "years&apos;" },
  { from: /'Supply Only'/gi, to: "&apos;Supply Only&apos;" },
  { from: /'Turnkey'/gi, to: "&apos;Turnkey&apos;" },
  { from: /"cookies"/g, to: "&quot;cookies&quot;" },
  { from: /"Acts of God,"/g, to: "&quot;Acts of God,&quot;" },
  { from: /Terms & Conditions/g, to: "Terms &amp; Conditions" },
  { from: /Time & Attendance/g, to: "Time &amp; Attendance" },
  { from: /Government & PSU/g, to: "Government &amp; PSU" },
  { from: /Government & PSUs/g, to: "Government &amp; PSUs" },
  { from: /IT & Security/g, to: "IT &amp; Security" },
  { from: /R&D/g, to: "R&amp;D" },
  { from: /&amp;amp;/g, to: "&amp;" }
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Run replacements
  regexes.forEach(r => {
    content = content.replace(r.from, r.to);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    modifiedCount++;
    console.log('Fixed', file);
  }
});
console.log('Total fixed:', modifiedCount);
