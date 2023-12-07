const core = require("@actions/core");
const { Octokit } = require("octokit");
const nextVersion = require("semver/functions/inc");

const octokit = new Octokit({
  headers: { "User-Agent": "mwznn/semver-gist@v1-dev" },
});

async function get(id) {
  return new Promise(async (resolve, reject) => {
    const response = await octokit.rest.gists.get({ gist_id: id });
    if (response.data.files.semver) {
      resolve(JSON.parse(response.data.files.semver.content));
    } else {
      reject("Failed to find semver gist file.");
    }
  });
}

async function update(id) {
  return new Promise(async (resolve, reject) => {
    const response = await octokit.rest.gists.update({ gist_id: id });
    if (response.data.files.semver) {
      resolve(JSON.parse(response.data.files.semver.content));
    } else {
      reject("Failed to update semver gist.");
    }
  });
}

try {
  // const inputs = {
  //   id: core.getInput("id"),
  //   app: core.getInput("app"),
  //   releaseType: core.getInput("releaseType"),
  //   identifier: core.getInput("identifier"),
  //   identifierBase: core.getInput("identifierBase"),
  // };

  const inputs = {
    id: "aa6d8754cedff91ff82e249755d44a43",
    app: "core",
    releaseType: "prerelease",
    identifier: "dev",
    identifierBase: undefined,
  };

  get(inputs.id)
    .then((semver) => {
      const version = nextVersion(semver[inputs.app], inputs.releaseType, inputs.identifier, inputs.identifierBase ?? false);
      core.setOutput("next", version);
    })
    .catch((err) => core.setFailed(err.message));
} catch (err) {
  core.setFailed(err.message);
}
