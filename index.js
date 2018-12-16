#!/usr/bin/env node

const fs = require('fs');

let folder = '';

if (process.argv.length < 3) {
  console.log(`Invalid number of arguments`);
  process.exit(1);
} else {
  folder = process.argv[2];
}

console.log(`Watching for file changes in ${folder}`);

fs.watch(folder, (event, filename) => {
  console.log(`file: ${filename}, event: ${event}`);
});
