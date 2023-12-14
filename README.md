# GH-Semver - Github SemVer by Gist
Control versioning for different packages using gist file as persistence. For more info and how to do things, check the [semver page](https://semver.org/).

## Requirements

This action requires an already created gist with a specific format and filename as `semver.json`.

```json
{
    "package-name-01": "0.0.0",
    "package-name-02": "0.0.0",
    "...": "and so on..."
}
```

## Inputs

### `action`
Defines rather the action is `next` or `patch`. Defaults to `next` when null.

### `token` 
`Required` Defines the token used for the actions. Create a [personal access token](https://github.com/settings/personal-access-tokens/new) with GIST permissions to be able to use it.

### `gist_id`
`Required` Defines the public or private id of the gist.

### `package_name`
`Required` Defines the name of the package that will be searched.

### `release_type` *
Defines the type of the release for the new version using `major|premajor|minor|preminor|patch|prepatch|prerelease`. Defaults to `patch` when null.

### `identifier` *
Defines the identifier ot the new version, e.g. `dev|alpha|beta|build`.

### `identifier_base` *
Defines the base value for the identifier using `false` (to ignore the base) `0` or `1` as the base value. Defaults to `false` when null.

### `snapshot` *
A snapshot of the parameters used in the previous calculation.

### Notes

- \* Used only by `next` action. Identifier and Identifier_base work only with prerelease types.
   
## Outputs

### `version`
The calculated version of the required package.

### `snapshot`
A snapshot of the parameters used in the previous calculation.

## Usage Examples

```yaml
env:
  GIST_ID: "1304484ba012313dffdf2ec41300f89a" # this is a public example
  PACKAGE_NAME: "my-package"

# fetches new version
- id: semver
- uses: mwznn/gh-semver@{version}
    with:
        action: next
        token: ${{ secrets.GITHUB_TOKEN }},
        gist_id: ${{ env.GIST_ID }}
        package_name: ${{ env.PACKAGE_NAME }}
        release_type: beta
        identifier: beta
        identifier_base: 1

# patch action
- uses: mwznn/gh-semver@{version}
    with:
        action: patch
        token: ${{ secrets.GITHUB_TOKEN }},
        gist_id: ${{ env.GIST_ID }}
        package_name: ${{ env.PACKAGE_NAME }}
        snapshot: ${{ steps.semver.outputs.snapshot }}
```

#### `next` Action outputs
```json
{
    "version": "0.0.1-dev.0",
    "content": "{\"my-package\":\"0.0.0\"}"
}
```

## Testing Locally

In order to test locally, create a `env.js` with some configurations.

```js
module.exports = {
  "ACTION": "next | patch",
  "TOKEN": "__PAT_TOKEN_WITH_GIST_PERMISSION__",
};
```