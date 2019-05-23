import { WatchFS } from ".";

// import assert = require('assert')
import mocha from "mocha";
// import shell from "shelljs";

mocha.describe("Watch for", () => {
  it("does nothing", () => {
    new WatchFS([]);
  });
});
