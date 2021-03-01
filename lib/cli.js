(function () {
  var colorize, diff, fs, git, simpleGit, tty;

  fs = require("fs");

  tty = require("tty");

  simpleGit = require("simple-git");

  diff = require("./index").diff;

  colorize = require("./colorize").colorize;

  git = simpleGit();

  module.exports = async function (argv) {
    var data1, data2, json1, json2, options, result;
    options = require("dreamopt")(
      [
        "Usage: json-diff [-vjCk] first.json second.json",
        "Arguments:",
        "  modified.json              Git modified file #var(file) #required",
        "General options:",
        "  -v, --verbose           Output progress info",
        "  -C, --[no-]color        Colored output",
        "  -j, --raw-json          Display raw JSON encoding of the diff #var(raw)",
        "  -k, --keys-only         Compare only the keys, ignore the differences in values #var(keysOnly)",
      ],
      argv
    );
    if (options.verbose) {
      process.stderr.write(JSON.stringify(options, null, 2) + "\n");
    }
    if (options.verbose) {
      process.stderr.write("Loading files...\n");
    }
    data2 = fs.readFileSync(options.file, "utf8");
    data1 = await git.show(["HEAD:" + options.file]);
    if (options.verbose) {
      process.stderr.write("Parsing old file...\n");
    }
    json1 = JSON.parse(data1);
    if (options.verbose) {
      process.stderr.write("Parsing new file...\n");
    }
    json2 = JSON.parse(data2);
    if (options.verbose) {
      process.stderr.write("Running diff...\n");
    }
    result = diff(json1, json2, options);
    if (options.color == null) {
      options.color = tty.isatty(process.stdout.fd);
    }
    if (result) {
      if (options.raw) {
        if (options.verbose) {
          process.stderr.write("Serializing JSON output...\n");
        }
        process.stdout.write(JSON.stringify(result, null, 2));
      } else {
        if (options.verbose) {
          process.stderr.write("Producing colored output...\n");
        }
        process.stdout.write(
          colorize(result, {
            color: options.color,
          })
        );
      }
    } else {
      if (options.verbose) {
        process.stderr.write("No diff");
      }
    }
    if (result) {
      return process.exit(1);
    }
  };
}.call(this));
