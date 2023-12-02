const core = require("@actions/core");
const https = require("https");

async function getGist(id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.github.com",
      port: 443,
      path: `/gists/${id}`,
      method: "GET",
      headers: {
        "User-Agent": "mwznn/actions-semver-gist",
      },
    };
    console.log(`Requesting URL: https://${options.hostname}${options.path}`);
    https.get(options, (res) => {
      let content = [];
      res.on("data", (chunk) => content.push(chunk));
      res.on("end", () => {
        const response = JSON.parse(Buffer.concat(content).toString());
        if (response.files.semver) {
          resolve(JSON.parse(response.files.semver.content));
        } else {
          reject({ message: "semver not found." });
        }
      });
      res.on("error", (err) => reject(err));
    });
  });
}

try {
  const id = core.getInput("id");
  getGist(id)
    .then((content) => core.setOutput("content", content))
    .catch((err) => core.setFailed(err.message));
} catch (error) {
  core.setFailed(error.message);
}
