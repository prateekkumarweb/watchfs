#!/usr/bin/env node

const version = "v0.1.2";

import { WatchFS } from ".";
import { ArgumentParser } from "argparse";
import colors from "colors";
import shell from "shelljs";

/**
 * Initiaze argument parser
 */
const parser = new ArgumentParser({
  version: version,
  addHelp: true,
  description: "Filesystem watcher"
});

parser.addArgument(["-e", "--expr"], {
  action: "append",
  nargs: "+",
  help: "Regex that will be passed to ls to list the files to be watched",
  required: true,
  metavar: "Expression"
});

parser.addArgument(["-c", "--command"], {
  action: "append",
  nargs: "+",
  help: "Command to run when file has changed",
  metavar: "Command"
});

const args = parser.parseArgs();

if (!args.command) args.command = [];

const exprs: any[] = args.expr;
const commands: any[] = args.command;

const flatexprs: string[] = [].concat(...exprs);
const flatcommands: string[] = [].concat(...commands);

/**
 * Initialize watcher
 */
const watcher = new WatchFS(flatexprs);

/**
 * Run commands after each change in file is detected
 */
watcher.watchFiles(() => {
  flatcommands.forEach((command: string) => {
    console.log(`${colors.yellow(command)}`);
    shell.exec(command);
  });
});
