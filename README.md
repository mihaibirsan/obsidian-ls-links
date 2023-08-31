
# obsidian-ls-links

List all files linked to in a given Obsidian note.

> NOTE: This script is very limited. It was build for a very specific task, but may become useful again in the future, so it may be exteneded. Feel free to open an issue!

## Usage

You'll need to clone this repository and install as a global node package.

```sh
npm install -g
cd /path/to/vault # looks for notes in the current vault directory
npx obsidian-ls-links folder/note.md > TMP
vim TMP # edit the list as needed
cat TMP | xargs -I{} mv "{}" "new-folder/" # move all files
```
