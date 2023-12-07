# SemVer Gist

This action controls the SemVer for the project using gist as a source.

## Inputs

| name           | description                    | required |  default   | example                                                   |
| -------------- | ------------------------------ | :------: | :--------: | --------------------------------------------------------- |
| **id**         | id of the gist                 | **true** |     -      | 9b757b4e-0d41-46f2-a41c-7df5e9bca1c5                      |
| **app**        | name of the app being verified | **true** |     -      | project-name                                              |
| releaseType    | type of the release            |  false   | prerelease | *major/premajor/minor/preminor/patch/prepatch/prerelease* |
| identifier     | release identifier             |  false   |    dev     | *dev/alpha/beta/build* etc.                               |
| identifierBase | base value for the identifier  |  false   |    null    | 0, 1 or null                                              |

## Outputs

### 'next'

The semver version for the specified app. 

#### Examples: 

`1.0.0` for major

`1.0.0-alpha.1` with identifier and base identifier

## How to Use

```yaml
- id: semver
- uses: mwznn/semver-gist@{version}
    with:
        id: 42e95884-e039-4437-a546-9f40cfc95309
        app: my-project
        releaseType: beta
        identifier: beta
        identifierBase: 0

- run: |
    echo "The next version is ${{ steps.semver.outputs.next) }}"
```