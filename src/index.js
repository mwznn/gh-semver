const core = require("@actions/core");
const github = require("@actions/github");
const semverInc = require("semver/functions/inc");

function getInputs() {
  return {
    action: core.getInput("action", { required: true }),
    token: core.getInput("token", { required: true }),
    gist_id: core.getInput("gist_id", { required: true }),
    package_name: core.getInput("package_name", { required: true }),
    release_type: core.getInput("release_type"),
    identifier: core.getInput("identifier"),
    identifier_base: core.getInput("identifier_base"),
    snapshot: core.getInput("snapshot"),
  };
}

async function next(inputs) {
  const octokit = github.getOctokit(inputs.token);
  const response = await octokit.rest.gists.get({ gist_id: inputs.gist_id });
  if (!response.data.files.semver) {
    core.setFailed("Failed to find semver file.");
    return;
  }
  const semver = JSON.parse(response.data.files.semver.content);
  const identifier_base = inputs.identifier_base === "" || inputs.identifier_base === "false" ? false : inputs.identifier_base;
  const version = semverInc(semver[inputs.package_name], inputs.release_type, inputs.identifier, identifier_base);
  core.setOutput("version", version);
  core.setOutput("snapshot", {
    version,
    content: semver,
  });
}

async function patch(inputs) {
  const snapshot = JSON.parse(inputs.snapshot);
  snapshot.content[inputs.package_name] = snapshot.version;
  const octokit = github.getOctokit(inputs.token);
  try {
    await octokit.rest.gists.update({
      gist_id: inputs.gist_id,
      files: { "semver.json": { content: JSON.stringify(snapshot.content, null, 2) } },
    });
    core.info("Successfully updated the semver for the package.");
  } catch (error) {
    core.setFailed(`Failed to update with error: ${error.message}`);
  }
}

try {
  const inputs = getInputs();
  switch (inputs.action.toLowerCase()) {
    case "patch":
      patch(inputs);
      break;
    case "next":
    default:
      next(inputs);
      break;
  }
} catch (err) {
  console.error(err.message);
}
