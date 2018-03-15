# vue-cli-plugin-e2e-testcafe

> e2e-testcafe plugin for vue-cli

This adds E2E testing support using [TestCafe](https://testcafe.devexpress.com/).

## ⚠️ WIP ⚠️
### Implemented Features
- Run TestCafe tests in headless chrome with `vue-cli-service e2e`
- Run TestCafe tests in chrome with `vue-cli-service e2e:open`

### Upcoming Features
- Run TestCafe tests in all browsers
- Plugin generator
  - Example test scaffold
  - Generate e2e commands for all installed browsers
- Options
  - Concurrency
  - Debug mode
  - Adjust timeout

## Injected Commands

- **`vue-cli-service e2e`**

  run e2e tests headlessly with `testcafe "chrome:headless"`.

  Options:

  ```
  --url      run e2e tests against given url instead of auto-starting dev server
  -s, --spec runs a specific spec file or a directory of spec files
  ```

  Additionally, [all TestCafe CLI options for `testcafe chrome:headless` are also supported](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html).

- **`vue-cli-service e2e:open`**

  run e2e tests in interactive mode with `testcafe chrome`.

  Options:

  ```
  --url      run e2e tests against given url instead of auto-starting dev server
  -s, --spec runs a specific spec file or a directory of spec files
  ```

  Additionally, [all TestCafe CLI options for `testcafe chrome` are also supported](https://devexpress.github.io/testcafe/documentation/using-testcafe/command-line-interface.html).

  Both commands automatically starts a server in production mode to run the e2e tests against. If you want to run the tests multiple times without having to restart the server every time, you can start the server with `vue-cli-service serve --mode production` in one terminal, and then run e2e tests against that server using the `--url` option.

## Configuration

We've pre-configured TestCafe to place most of the e2e testing related files under `<projectRoot>/tests/e2e`.

## Installing in an Already Created Project

``` sh
npm install -D vue-cli-plugin-e2e-testcafe
```
