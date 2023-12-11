const { exec } = require("child_process");
const path = require("path");
const env = require("./env.js");

const indexPath = path.resolve(__dirname, "../dist/index.js");

// arrange env variables
process.env.INPUT_ACTION = "patch";
process.env.INPUT_TOKEN = env.TOKEN;
process.env.INPUT_GIST_ID = "f0f8dd72e890e76b9e647c22188f30da";
process.env.INPUT_PACKAGE_NAME = "my-package";
process.env.INPUT_RELEASE_TYPE = "patch";
process.env.INPUT_IDENTIFIER = "";
process.env.INPUT_IDENTIFIER_BASE = false;
process.env.INPUT_SNAPSHOT = '{"version":"0.0.1-dev.0","content":{"my-package":"0.0.0"}}';

exec(`node ${indexPath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Failed with error: ${err.message}`);
    console.log("Output", stderr);
  } else {
    console.log("Output", stdout);
  }
});
