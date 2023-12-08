# semver-gist
Control versioning for different packages using gist file as persistence.

## Requirements

Before using the semver, create your

## Inputs

### `action`
Defines rather the action is `next` or `patch`. Defaults to `next` when null.

### `token` 
`Required` Defines the token used for the actions. Inside the workflow, it uses the default GITHUB_TOKEN. For testing, use any PAT with permission.

### `gist_id`
`Required` Defines the public or private id of the gist.

### `package_name`
`Required` Defines the name of the package that will be searched.

### `release_type` **
Defines the type of the release for the new version using `major|premajor|minor|preminor|patch|prepatch|prerelease`. Defaults to `prerelease` when null.

### `identifier` **
Defines the identifier ot the new version, e.g. `dev|alpha|beta|build`. Defaults to `dev` when null.

### `identifier_base` **
Defines the base value for the identifier using `0` or `1` as the base value. Defaults to `0` when null.

### `snapshot` *
A snapshot of the parameters used in the previous calculation.

### Notes

- \* Used only by `patch` action.
- ** Used only by `next` action.
   
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
- uses: mwznn/semver-gist@{version}
    with:
        action: next
        token: ${{ secrets.GITHUB_TOKEN }},
        gist_id: ${{ env.GIST_ID }}
        package_name: ${{ env.PACKAGE_NAME }}
        release_type: beta
        identifier: beta
        identifier_base: 1

# patch action
- uses: mwznn/semver-gist@{version}
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