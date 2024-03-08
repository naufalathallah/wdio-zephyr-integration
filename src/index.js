const axios = require("axios");

const zephyrApiEndpoint =
  "https://api.zephyrscale.smartbear.com/v2/testexecutions";
const apiToken = process.env.ZEPHYR_TOKEN;

const updateZephyrTestExecution = async (
  testCaseKey,
  statusName,
  comment,
  duration
) => {
  const data = {
    projectKey: process.env.ZEPHYR_PROJECT_KEY,
    testCaseKey: testCaseKey,
    testCycleKey: process.env.ZEPHYR_TEST_CYCLE_KEY,
    statusName: statusName,
    environmentName: process.env.ZEPHYR_ENV,
    assignedToId: process.env.ZEPHYR_ACCOUNT,
    executedById: process.env.ZEPHYR_ACCOUNT,
    comment: comment,
    executionTime: duration,
  };

  try {
    const response = await axios.post(zephyrApiEndpoint, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: apiToken,
      },
    });
    console.log(`Test Case ${testCaseKey} updated with status ${statusName}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to update Test Case ${testCaseKey}:`, error);
    throw error;
  }
};

const handleTestResult = async function (
  test,
  context,
  { error, result, duration, passed, retries }
) {
  const enableZephyrUpdate = process.env.ENABLE_ZEPHYR_UPDATE === "true";

  if (enableZephyrUpdate) {
    const statusName = passed ? "Pass" : "Fail";
    let comment = "";

    if (!passed && error) {
      comment = `Error: ${error.message}`;
    }

    let testCaseKeys = test.title.match(/\[key: (.+?)\]/);
    if (testCaseKeys && testCaseKeys.length > 1) {
      testCaseKeys = testCaseKeys[1].split(",").map((key) => key.trim());

      for (const testCaseKey of testCaseKeys) {
        if (testCaseKey) {
          await updateZephyrTestExecution(
            testCaseKey,
            statusName,
            comment,
            duration
          );
        }
      }
    }
  }
};

module.exports = { updateZephyrTestExecution, handleTestResult };
