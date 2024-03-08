<p align="left"> <img src="https://komarev.com/ghpvc/?username=naufalathallah&repo=wdio-zephyr-integration&label=Repo%20views&color=0e75b6&style=flat" alt="wdio-zephyr-integration" /> </p>

# wdio-zephyr-integration

This package provides an integration between WebdriverIO and Zephyr Scale (Jira Cloud) to report automated test execution results.

## Installation

Install the package using npm:

```bash
npm install wdio-zephyr-integration
```

**Note:** This package uses CommonJS modules. Ensure that your WebdriverIO configuration (`wdio.conf.js`) supports CommonJS imports.

## Configuration

Create a .env file in your project root directory and add the following environment variables:

```bash
# Toogle on of zephyr update (true/false)
ENABLE_ZEPHYR_UPDATE=true

ZEPHYR_PROJECT_KEY=YourProjectKey
ZEPHYR_TEST_CYCLE_KEY=YourTestCycleKey
ZEPHYR_ENV=YourEnvironment
ZEPHYR_ACCOUNT=YourAccountId
ZEPHYR_TOKEN=YourApiToken
```

Replace the placeholder values with your actual Zephyr Scale configuration.

## Usage

In your WebdriverIO configuration file (e.g., wdio.conf.js), import and use the handleTestResult function from the package in the afterTest hook:

```javascript
const { handleTestResult } = require("wdio-zephyr-integration");

exports.config = {
  // Other configuration...

  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    await handleTestResult(test, context, {
      error,
      result,
      duration,
      passed,
      retries,
    });
  },
};
```

Ensure that your test titles include the Zephyr test case key in the format [key: TEST-123] for the integration to work:

```javascript
describe("My Test Suite", async () => {
  it("[key: TEST-123] should do something", () => {
    // Test implementation...
  });
});
```

## Contributing

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/naufalathallah/wdio-zephyr-integration/issues) on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/naufalathallah/wdio-zephyr-integration/blob/main/LICENSE) file for details.
