#!/usr/bin/env node

const version = 'v0.1.0'

import { WatchFS } from '.'
import { ArgumentParser } from 'argparse'

const parser = new ArgumentParser({version: version, addHelp: true, description: 'Filesystem watcher'})

parser.addArgument(['-e', '--expr'], {
  action: 'append',
  nargs: '+',
  help: 'Regex that will be passed to ls to list the files to be watched',
  required: true,
  metavar: 'Expression'
})

parser.addArgument(['-c', '--command'], {
  action: 'append',
  nargs: '+',
  help: 'Command to run when file has changed',
  metavar: 'Command'
})

const args = parser.parseArgs();

if (!args.command)
  args.command = [];

const exprs: string[] = args.expr
const commands: string[] = args.command

let files: string[] = [];

args.expr.forEach((pattern: string) => {
  exprs.push(pattern)
})

new WatchFS(exprs, commands)
