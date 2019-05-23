import fs from "fs";
import colors from "colors";
import shell from "shelljs";

/**
 * WatchFS class.
 */
export class WatchFS {
  expressions: string[];
  fsWait: boolean;
  files: string[];

  /**
   * Initialize WatchFS object
   * @param expressions
   * File names (or patterns that will be resolved
   * by UNIX `find` command) to be watched.
   */
  constructor(expressions: string[]) {
    this.expressions = expressions;
    this.files = [];
    this.fsWait = false;

    /**
     * Find all matching files
     */
    expressions.forEach((pattern: string) => {
      let matchedFiles = shell.find(pattern);
      if (matchedFiles.length == 0) return;
      matchedFiles.forEach((file: string) => {
        this.files.push(file);
      });
    });

    /**
     * Log if no files have been matched
     */
    if (this.files.length == 0) {
      console.log(colors.yellow(`No files found to watch`));
      return;
    }

    /**
     * Log that constructor has been initialized
     * TODO Use verbosity level in future or custom logger
     */
    console.log(
      `WatchFS initialized for \n${colors.green(this.files.join("\n"))}`
    );
  }

  /**
   * Watch for file changes
   * @param callback Function that will be called after a file change is detected
   */
  watchFiles(callback: () => any) {
    this.files.forEach(file => {
      fs.watchFile(
        file,
        { interval: 100 },
        (current: fs.Stats, previous: fs.Stats) => {
          let curr_date: number = current.mtime.getTime();
          let prev_date: number = previous.mtime.getTime();
          if (curr_date == prev_date) return;
          console.log(colors.red("Files changed"));
          if (this.fsWait) return;
          this.fsWait = true;
          callback();
          this.fsWait = false;
        }
      );
    });
  }
}

export default WatchFS;
