# getfu.lambda.skeleton

This is a boilerplate for Node.js + Serverless Frameworks projects.

## Setup

Install Serverless Framework globally and project dependencies

```
npm install -g serverless
npm ci
```

### ESLint and Prettier

```
npm run lint:check
npm run lint:check -- --cache
```

### Notes

- Husky is used for pre commit hooks to run lint checks before git commits, this is disabled in CI
- `babel-runtime` and `babel-plugin-transform-runtime` are included in the package.json since they are a dependency of the shared library which hasn't been updated in awhile. Once that is updated these can be removed

### Deploy

To deploy your own stack

```
npm run sls:deploy -- -s YOURSTACKNAME
```

### Invoke Deployed Lambda

```
npm run sls:invoke -- -f fetch
```

### Deploy Lambda offline locally

```
npm run sls:offline -- -s YOURSTACKNAME
```
