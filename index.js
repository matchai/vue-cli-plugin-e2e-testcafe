function removeArg(rawArgs, arg) {
  const matchRE = new RegExp(`^--${arg}`);
  const equalRE = new RegExp(`^--${arg}=`);
  const i = rawArgs.findIndex(arg => matchRE.test(arg));
  if (i > -1) {
    rawArgs.splice(i, equalRE.test(rawArgs[i]) ? 1 : 2);
  }
}

module.exports = (api, options) => {
  const chalk = require("chalk");

  function run(command, args, rawArgs) {
    removeArg(rawArgs, "url");
    removeArg(rawArgs, "mode");
    removeArg(rawArgs, "file");

    const serverPromise = args.url
      ? Promise.resolve({ url: args.url })
      : api.service.run("serve", { mode: args.mode || "production" });

    return serverPromise.then(({ url, server }) => {
      const { info } = require("@vue/cli-shared-utils");
      info(`Starting e2e tests...`);

      const testCafeArgs = [
        command,
        args.file,
        `--hosename=${url}`,
        ...rawArgs
      ].filter(v => v);

      const execa = require("execa");
      const testCafeBinPath = require.resolve("testcafe/bin/testcafe");
      const runner = execa(testCafeBinPath, testCafeArgs, { stdio: "inherit" });
      if (server) {
        runner.on("exit", () => server.close());
        runner.on("error", () => server.close());
      }

      if (process.env.VUE_CLI_TEST) {
        runner.on("exit", code => {
          process.exit(code);
        });
      }

      return runner;
    });
  }

  const commandOptions = {
    "--mode":
      "specify the mode the dev server should run in. (default: production)",
    "--url":
      "run e2e tests against given url instead of auto-starting dev server",
    "--spec": "runs a specific spec file or directory of spec files"
  };

  api.registerCommand(
    "e2e",
    {
      description: "run e2e tests headlessly with `testcafe chrome:headless`",
      usage: "vue-cli-service e2e [options]",
      options: Object.assign(
        {
          // "--arg": "insert extra argument here"
        },
        commandOptions
      ),
      details:
        `All TestCafe CLI options are also supported:\n` +
        chalk.yellow(
          `https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html`
        )
    },
    (args, rawArgs) => run("chrome:headless", args, rawArgs)
  );

  api.registerCommand(
    "e2e:open",
    {
      description: "run e2e tests in interactive mode with `testcafe chrome`",
      usage: "vue-cli-service e2e:open [options]",
      options: commandOptions,
      details:
        `All TestCafe CLI options are supported:\n` +
        chalk.yellow(
          `https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html`
        )
    },
    (args, rawArgs) => run("chrome", args, rawArgs)
  );
};
