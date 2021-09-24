const fs = require('fs');
const execSync = require('child_process').execSync;

function build(idiomLength) {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  for (var i=1; i<=10; i++) {
    execSync(`node kanji-words.js ${idiomLength} ${i} > dist/${i}.lst`);
  }
}

build(2);
// build(3);

