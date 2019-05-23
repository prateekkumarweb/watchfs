import fs = require("fs");
import shell = require("shelljs");
import colors = require("colors");

export class WatchFS {
  expressions: string[];
  commands: string[];
  watchers: (fs.FSWatcher | void)[];
  fsWait: boolean;
  files: string[];
  constructor(expressions: string[], commands: string[]) {
    this.expressions = expressions;
    this.commands = commands;
    this.files = [];
    this.watchers = [];
    this.fsWait = false;

    expressions.forEach((pattern: string) => {
      let matchedFiles = shell.find(pattern);
      if (matchedFiles.length == 0) return;
      matchedFiles.forEach((file: string) => {
        this.files.push(file);
      });
    });

    if (this.files.length == 0) {
      console.log(colors.yellow(`No files found to watch`));
      return;
    }

    console.log(
      `Watching for file changes in \n${colors.green(this.files.join("\n"))}`
    );

    this.files.forEach(file => {
      this.watchers.push(
        fs.watchFile(file, { interval: 100 }, (current: any, previous: any) => {
          let curr_date: number = current.mtime.getTime();
          let prev_date: number = previous.mtime.getTime();
          if (curr_date == prev_date) return;
          console.log(colors.red("Files changed"));
          if (this.fsWait) return;
          this.fsWait = true;
          setTimeout(() => {
            this.fsWait = false;
          }, 100);
          commands.forEach((command: string) => {
            console.log(`${colors.yellow(command)}`);
            shell.exec(command);
          });
          this.fsWait = false;
        })
      );
    });
  }
}
