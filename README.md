<h1 align="center">Welcome to <i>react-utils</i> 👋</h1>
<p>
<!-- <% if (isProjectOnNpm) { -%>
  <a href="https://www.npmjs.com/package/<%= projectName %>" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/<%= projectName %>.svg">
  </a>
<% } -%>
<% if (projectVersion && !isProjectOnNpm) { -%>
  <img alt="Version" src="https://img.shields.io/badge/version-<%= projectVersion %>-blue.svg?cacheSeconds=2592000" />
<% } -%>
<% if (projectPrerequisites) { -%>
<% projectPrerequisites.map(({ name, value }) => { -%>
  <img src="https://img.shields.io/badge/<%= name %>-<%= encodeURIComponent(value) %>-blue.svg" />
<% }) -%>
<% } -%>
<% if (projectDocumentationUrl) { -%>
  <a href="<%= projectDocumentationUrl %>" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
<% } -%>
<% if (isGithubRepos) { -%>
  <a href="<%= repositoryUrl %>/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
<% } -%>
<% if (licenseName) { -%>
  <a href="<%= licenseUrl ? licenseUrl : '#' %>" target="_blank">
    <img alt="License: <%= licenseName %>" src="https://img.shields.io/<%= isGithubRepos ? `github/license/${authorGithubUsername}/${projectName}` : `badge/License-${licenseName}-yellow.svg` %>" />
  </a>
<% } -%>
<% if (authorTwitterUsername) { -%>
  <a href="https://twitter.com/<%= authorTwitterUsername %>" target="_blank">
    <img alt="Twitter: <%= authorTwitterUsername %>" src="https://img.shields.io/twitter/follow/<%= authorTwitterUsername %>.svg?style=social" />
  </a>
<% } -%>
</p> -->
A set of React utils, like router, form validator

### 🏠 [Homepage](https://github.com/ESMO-ENTERPRISE/react-utils)


### ✨ [Docs](https://esmo-enterprise.github.io/react-utils/docs/intro)

## Prerequisites

- npm
- node
- react

## Install

Using NPM
```sh
npm i @esmo/react-utils
```
Using YARN
```sh
yarn add @esmo/react-utils
```
Using PNPM
```sh
pnpm i @esmo/react-utils
```

## Usage

See the specific documentation for each [module](https://esmo-enterprise.github.io/react-utils/docs/intro).

## Author
👤 **Víctor Gómez**
* GitHub: [@victorgomez09](https://github.com/victorgomez09)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/ESMO-ENTERPRISE/react-utils/issues).

## 📝 License

Copyright © 2023 [Víctor Gómez](https://github.com/victorgomez09).<br />
This project is [Apache-2.0](https://github.com/ESMO-ENTERPRISE/react-utils/tree/main/LICENSE) licensed.
