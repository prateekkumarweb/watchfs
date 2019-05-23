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

  let fldr = "test_random_watch";
  let fname = `random_file.watchfile`;

  shell.mkdir("-p", [fldr]);

  it(`creates ${fname}`, done => {
    const w = new WatchFS([fldr]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        changed = true;
      }
    });
    shell.exec(`touch ${fldr}/${fname}`);
    setTimeout(() => {
      if (!changed) {
        done(new Error(`File changed but not watched`));
      } else {
        done();
      }
      w.stop();
    }, 100);
  });

  it(`changes ${fname}`, done => {
    const w = new WatchFS([fldr]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        changed = true;
      }
    });
    shell.exec(`echo "Hello" >> ${fldr}/${fname}`);
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
    const w = new WatchFS([fldr]);
    let changed = false;
    w.watchFiles(filename => {
      if (filename == fname) {
        changed = true;
      }
    });
    shell.exec(`rm ${fldr}/${fname}`);
    setTimeout(() => {
      if (!changed) {
        done(new Error(`File changed but not watched`));
      } else {
        done();
      }
      w.stop();
    }, 100);
  });

  it(`deleting temp folder`, done => {
    shell.rm("-r", [fldr]);
    done();
  });
});
