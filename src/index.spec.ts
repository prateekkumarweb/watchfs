import { WatchFS } from '.'

import assert = require('assert')
import mocha = require('mocha')

describe('Basic constructor', () => {

  it('does nothing', () => {
    const watchfs = new WatchFS([], [])
  });

});
