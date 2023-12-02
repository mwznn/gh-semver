# SemVer Gist

This action controls the SemVer for the project using gist as a source.

## Inputs

### 'id'

**Required** | The id of the SemVer gist file.

## Outputs

### 'content'

The raw content of the SemVer gist file.

## How to Use

```yaml
uses: mwznn/actions-semver-gist@{version}
with:
    id: 42e95884-e039-4437-a546-9f40cfc95309
```