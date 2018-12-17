import * as fs from 'fs'
import * as shell from 'shelljs'
import * as colors from 'colors'

const flatArray = (arr: any) => [].concat(...arr);

export class WatchFS {
  expressions: string[]
  commands: string[]
  watchers: (fs.FSWatcher|void)[]
  fsWait: boolean
  files: string[]
  constructor(expressions: string[], commands: string[]) {
    this.expressions = expressions
    this.commands = commands
    this.files = []
    this.watchers = []
    this.fsWait = false

    expressions.forEach((pattern: string) => {
      let matchedFiles = shell.find(pattern)
      if (matchedFiles.length == 0) return;
      matchedFiles.forEach((file: string) => {
        this.files.push(file);
      })
    })

    if (this.files.length == 0) {
      console.log(`No files found to watch`.yellow)
      return
    }

    console.log(`Watching for file changes in \n${this.files.join('\n').green}`);

    this.files.forEach((file) => {
      this.watchers.push(fs.watchFile(file, {interval: 100}, (current: Object, previous: Object) => {
        console.log('Files changed'.red)
        if (this.fsWait) return
        this.fsWait = true
        setTimeout(() => {
          this.fsWait = false
        }, 100)
        commands.forEach((command: string) => {
          console.log(`${command.yellow}`)
          shell.exec(command)
        })
        this.fsWait = false
      }))
    })
  }
}
