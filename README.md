# Boilerplate API Gateway

A minimal and fast API Gateway, based on Fastify.

## Continuos Integration

TBD

## Prerequisities

![NodeJS](https://img.shields.io/badge/Node-%3E%3D%208.11.0%20LTS-brightgreen.svg)
![NPM](https://img.shields.io/badge/npm-6.0.0-blue.svg)

To see available scripts try autocomplete for `npm run`.

## Development

### Style guide

Style guide is an extension of [AirBnb Base](https://airbnb.io/projects/javascript/) with some extension plugin, like Jest, as you can see in `eslintrc.js` file.

Project supports [Prettier](https://github.com/prettier/prettier) to enable **automatic linting** on file save.

### Type checking

Type checking is provided by TypeScript type checking. If you don't know what does it mean, take a look at [here](https://github.com/Microsoft/TypeScript/wiki/Type-Checking-JavaScript-Files) and [here](https://github.com/Microsoft/TypeScript/wiki/JsDoc-support-in-JavaScript).

### Testing

For BDD tests see `src/__tests__` folder while TDD tests are spread inside `src` with `.test.js` suffix.

VSCode Jest extension and code coverage gutters are useful while developing, see also `Debug Jest tests` configuration.

To launch tests via CLI there are `npm run test` for a single run, `npm run testing` for TDD and `npm run coverage` to open the HTML coverage report.

### Developing

`npm run dev` to start the app in watching mode.

### Dependencies

Keep dependencies under control via `deps-check` check and `deps-update` action.

It requires to install [npm-check](https://www.npmjs.com/package/npm-check).

### QA

Before committing ensure everything is fine via `npm run qa`.

### SemVer

This project follow [SemVer](https://semver.org/).

### GIT workflow

This project follow [Elever Workflow Manifesto](https://github.com/EleverSrl/workflow#elever-development-workflow).

### Visual Studio Code

If you'd like to use Visual Studio Code, here some utils:

Extensions:

```json
{
  "recommendations": [
    "DavidAnson.vscode-markdownlint",
    "EditorConfig.EditorConfig",
    "Orta.vscode-jest",
    "andys8.jest-snippets",
    "christian-kohler.npm-intellisense",
    "christian-kohler.path-intellisense",
    "codezombiech.gitignore",
    "dbaeumer.vscode-eslint",
    "eg2.vscode-npm-script",
    "esbenp.prettier-vscode",
    "mgmcdermott.vscode-language-babel",
    "ryanluker.vscode-coverage-gutters"
  ]
}
```

Debug:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Start debugging",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "protocol": "inspector",
      "port": 9229,
      "address": "localhost",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run-script", "debug"]
    },
    {
      "name": "Debug Jest tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": ["--inspect-brk", "${workspaceRoot}/node_modules/.bin/jest", "--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attach debugger",
      "protocol": "inspector",
      "processId": "${command:PickProcess}"
    }
  ]
}
```

Settings:

```json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wrappingIndent": "indent",
  "editor.trimAutoWhitespace": true,
  "editor.formatOnSave": true,

  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true
  },

  "search.exclude": {
    "**/node_modules": true
  },

  "javascript.format.enable": false,
  "javascript.validate.enable": true,

  "eslint.enable": true,
  "prettier.eslintIntegration": false,
  "prettier.printWidth": 120,

  "jest.autoEnable": true,
  "jest.enableInlineErrorMessages": true,
  "jest.enableSnapshotUpdateMessages": true,
  "jest.pathToJest": "node_modules/.bin/jest",

  "typescript.tsdk": "node_modules/typescript/lib"
}
```

A beautiful theme I suggest: `gerane.theme-brogrammer` with `Operator Mono` font.
