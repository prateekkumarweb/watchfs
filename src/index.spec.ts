import WatchFS from ".";

import mocha from "mocha";
import shell from "shelljs";

mocha.describe("Watch for a file", () => {
  it(`waches empty list`, done => {
    const w = new WatchFS([]);
    w.watchFiles(() => {});
    w.stop();
    done();
  });

  let fname = "random_file.txt";

  it(`creates ${fname}`, done => {
    const w = new WatchFS(["."]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        console.log(filename);
        changed = true;
      }
    });
    shell.exec(`touch ${fname}`);
    setTimeout(() => {
      if (!changed) {
        done(new Error(`File changed but not watched`));
        w.stop();
      } else {
        done();
      }
      w.stop();
    }, 100);
  });

  it(`changes ${fname}`, done => {
    const w = new WatchFS(["."]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        console.log(filename);
        changed = true;
      }
    });
    shell.exec(`echo "Hello" >> ${fname}`);
    setTimeout(() => {
      if (!changed) {
        done(new Error(`File changed but not watched`));
      } else {
        done();
      }
      w.stop();
    }, 100);
  });

  it(`deletes ${fname}`, done => {
    const w = new WatchFS(["."]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        console.log(filename);
        changed = true;
      }
    });
    shell.exec(`rm ${fname}`);
    setTimeout(() => {
      if (!changed) {
        done(new Error(`File changed but not watched`));
      } else {
        done();
      }
      w.stop();
    }, 100);
  });
});
