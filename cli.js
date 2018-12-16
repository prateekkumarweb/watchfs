#!/usr/bin/env node

const fs = require('fs');
const shell = require('shelljs');
const colors = require('colors');
const ArgumentParser = require('argparse').ArgumentParser;

// let  version = shell.exec('./get_version.sh', {silent: true}).stdout;
// version = version.trim();

const parser = new ArgumentParser({/*version: version, */addHelp: true, description: 'Filesystem watcher'});

// console.dir(process.argv);

parser.addArgument(['-e', '--expr'], {
  action: 'append',
  nargs: '+',
  help: 'Regex that will be passed to ls to list the files to be watched',
  required: true,
  metavar: 'Expression'
});

parser.addArgument(['-c', '--command'], {
  action: 'append',
  nargs: '+',
  help: 'Command to run when file has changed',
  metavar: 'Command'
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

console.log(`Watching for file changes in \n${files.join('\n').green}`);

let commands = [];

if (!args.command)
  args.command = [];

args.command.forEach((command) => {
  commands.push(command);
});

const flatArray = arr => [].concat(...arr);

commands = flatArray(commands);

let watchers = [];

let fsWait = false;

files.forEach((file) => {
  watchers.push(fs.watchFile(file, {interval: 100}, (current, previous) => {
    // console.log(filename + " " + event);
    console.log('Files changed'.red);
    // if (filename) {
    //   if (fsWait) return;
    //   fsWait = setTimeout(() => {
    //     fsWait = false;
    //   }, 100);
    //   console.log(`File ${filename} has changed`.red);
    //   commands.forEach((command) => {
    //     console.log(`Command: ${command.yellow}`);
    //     shell.exec(command);
    //   });
    //   fsWait = false;
    // }
    if (fsWait) return;
    fsWait = setTimeout(() => {
      fsWait = false;
    }, 100);
    commands.forEach((command) => {
      console.log(`${command.yellow}`);
      shell.exec(command);
    });
    fsWait = false;
  }));
});
