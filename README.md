

JSON structural Git diff
====================
Forked and modified from https://github.com/andreyvit/json-diff


Installation
------------

    npm install -g json-git-diff


Usage
-----

Simple:

    json-git-diff ./a.json

Detailed:

    % json-git-diff --help
    Usage: json-git-diff [-vjCk] modified.json HEAD~1

    Arguments:
      modified.json            File to diff
      gitref (optional)        Git ref to compare with (e.g HEAD~1, default: HEAD)

    General options:
      -v, --verbose         Output progress info
      -C, --[no-]color      Colored output
      -j, --raw-json        Display raw JSON encoding of the diff
      -k, --keys-only       Compare only the keys, ignore the differences in values
      -h, --help            Display this usage information