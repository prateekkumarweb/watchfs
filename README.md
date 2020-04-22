# WatchFS

[![NPM](https://nodei.co/npm/node-watchfs.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-watchfs/)
[![Snap Status](https://build.snapcraft.io/badge/prateekkumarweb/watchfs.svg)](https://build.snapcraft.io/user/prateekkumarweb/watchfs)
[![CircleCI](https://circleci.com/gh/prateekkumarweb/watchfs.svg?style=shield)](https://circleci.com/gh/prateekkumarweb/watchfs)
[![codecov](https://codecov.io/gh/prateekkumarweb/watchfs/branch/master/graph/badge.svg)](https://codecov.io/gh/prateekkumarweb/watchfs)

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/watchfs)

Watch for file changes and run given commands when change is detected.

## Usage

The below command will watch folder/files (passed as command line argument) and log the changes.

```sh
watchfs -e "expr" -c "command"
```

See `watchfs -h` for more information.

See documentation [here](https://watchfs.js.org/).

---

Copyright (c) 2018-2019 Prateek Kumar

LICENSE: MIT
