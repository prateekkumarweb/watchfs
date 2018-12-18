#!/usr/bin/env node

const version = 'v0.1.1'

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

const exprs: any[] = args.expr
const commands: any[] = args.command

const flatexprs: string[] = [].concat(...exprs)
const flatcommands: string[] = [].concat(...commands)

new WatchFS(flatexprs, flatcommands)
