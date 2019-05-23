import fs from "fs";
import colors from "colors";
import shell from "shelljs";

/**
 * WatchFS class.
 */
export class WatchFS {
  expressions: string[];
  _fsWait: boolean;
  files: string[];
  watchers: fs.FSWatcher[];
  _status: boolean;

  /**
   * Initialize WatchFS object
   * @param expressions
   * File names (or patterns that will be resolved
   * by UNIX `find` command) to be watched.
   */
  constructor(expressions: string[]) {
    this.expressions = expressions;
    this.files = [];
    this._fsWait = false;
    this.watchers = [];
    this._status = false;

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
  watchFiles(callback: (arg0: string) => any) {
    if (this._status) return;
    this._status = true;
    this.files.forEach(file => {
      this.watchers.push(
        fs.watch(file, (eventType: string, filename: string) => {
          if (eventType == "rename") {
            console.log(colors.red(`File ${filename} renamed`));
          } else {
            console.log(colors.red(`File ${filename} changed`));
          }
          if (this._fsWait) return;
          this._fsWait = true;
          callback(filename);
          this._fsWait = false;
        })
      );
    });
  }

  /**
   * Stop watching files
   */
  stop() {
    this.watchers.forEach(watcher => {
      watcher.close();
    });
    this.watchers = [];
    this._status = false;
  }
}

export default WatchFS;
