#!/usr/bin/env bash

VERSION=$(git describe --always --tags)
if [ ${#VERSION} == 7 ]
then
  echo ${VERSION}
else
  echo ${VERSION:1}
fi
