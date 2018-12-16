#!/usr/bin/env node

const fs = require('fs');
const shell = require('shelljs');
const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({addHelp: true, description: 'Filesystem watcher'});

// console.dir(process.argv);

parser.addArgument(['-e', '--expr'], {
  action: 'append',
  nargs: '+',
  help: 'Regex that will be passed to ls to list the files to be watched',
  required: true,
  metavar: 'Expression'
});
// parser.addArgument('--considerdotfiles', {
//   action: 'storeTrue',
//   nargs: 0,
//   defaultValue: false,
//   help: 'Watch dot files and folders as well'
// });
const args = parser.parseArgs();

// console.dir(args);

let files = [];

args.expr.forEach((pattern) => {
  shell.find(pattern).forEach((file) => {
    files.push(file);
  });
});

console.log(`Watching for file changes in \n${files.join('\n')}`);

let watchers = [];

files.forEach((file) => {
  watchers.push(fs.watch(file, (event, filename) => {
    if (filename && event === 'change') {
      console.log(`file: ${filename} has changed`);
    }
  }));
});
