# wdio-zephyr-integration

This package provides an integration between WebdriverIO and Zephyr Scale (formerly Zephyr for Jira) to report automated test execution results.

## Installation

Install the package using npm:

```bash
npm install wdio-zephyr-integration
```

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

In your WebdriverIO configuration file (e.g., wdio.conf.js), import (common js) and use the handleTestResult function from the package in the afterTest hook:

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

```markdown
## Contributing

If you encounter any issues or have suggestions for improvements, please [open an issue](https://github.com/naufalathallah/wdio-zephyr-integration/issues) on GitHub.

## License

This project is licensed under the ISC License - see the [LICENSE](https://github.com/naufalathallah/wdio-zephyr-integration/blob/main/LICENSE) file for details.
```
