import { WatchFS } from '.'

// import assert = require('assert')
import mocha = require('mocha')

mocha.describe('Basic constructor', () => {

  it('does nothing', () => {
    new WatchFS([], [])
  });

});
