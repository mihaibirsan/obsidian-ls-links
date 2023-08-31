#!/usr/bin/env node

const fs = require('fs');
const { listFiles } = require('./list');

const markdownFile = process.argv[2];

if (!markdownFile) {
  console.error('Please provide a markdown file as the first parameter');
  process.exit(1);
}

const allFiles = listFiles(process.cwd());

const markdown = fs.readFileSync(markdownFile, 'utf8');

const links = markdown.match(/\[\[(.*?)\]\]/g) || [];

const files = links.map(link => {
  const file = link.slice(2, -2);
  const [filename] = file.split(/[|#]/);

  const exists = allFiles[filename+'.md'] || false;

  return {
    filename,
    exists,
  };
});

// console.log('Files linked to:');
// console.table(files, ['filename', 'exists']);
console.log(files.filter(file => file.exists).map(file => file.exists).join('\n').replace(/\\/g, '/').replace(/'/g, "\\'"))
// This can be easily piped to `| xargs -I{} mv "{}" "new-folder/"` to move all files to a new folder
