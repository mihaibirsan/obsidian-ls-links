const fs = require('fs');
const path = require('path');

function listFiles(directory) {
  const files = {};

  const traverseDirectory = (directory) => {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stats = fs.statSync(itemPath);

      if (stats.isDirectory()) {
        traverseDirectory(itemPath);
      } else if (stats.isFile()) {
        if (files[item]) {
          console.warn(`Warning: duplicate file ${item}`);
        }
        files[item] = itemPath;
      }
    }
  };

  traverseDirectory(directory);

  return files;
}

if (require.main === module) {
  const directory = process.argv[2];
  console.log(Object.keys(listFiles(directory)).length);
}

module.exports = {
  listFiles,
};
