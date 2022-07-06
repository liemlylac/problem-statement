<div align="center">
  <h1>Problem statement</h1>
</div>

<p align="center">
<a href="https://snyk.io/test/github/liemlylac/problem-statement" target="_blank"><img src="https://snyk.io/test/github/liemlylac/problem-statement/badge.svg" alt="Snyk"></a>
<a href="https://codeclimate.com/github/liemlylac/problem-statement/test_coverage" target="_blank"><img src="https://api.codeclimate.com/v1/badges/5f8a181fcb325362e232/test_coverage" alt="Test Coverage"/></a>
  <a href="https://codeclimate.com/github/liemlylac/problem-statement/maintainability" target="_blank"><img src="https://api.codeclimate.com/v1/badges/5f8a181fcb325362e232/maintainability" alt="CodeClimate Maintainability"></a>
  <a href="https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=reliability_rating" alt="Reliability Rating"></a>
   <a href="https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement" target="_blank"><img src="https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=security_rating" alt="Security Rating"></a>
  <a href="https://github.com/liemlylac/problem-statement/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/github/license/liemlylac/problem-statement" alt="Mit License"></a>
 </p>


## Description
Problem statement using NestJs framework.

## Repo structure
Code artifacts as part of a lightweight monorepo, more appropriate for multi-project environments
Ref: [Monorepo - CLI | NestJS - A progressive Node.js framework](https://docs.nestjs.com/cli/monorepo#monorepo-mode)
```
  > apps/
    - main/
      - src/*
      - test/*
      - tsconfig.app.json
    - queue/
      - src/*
      - test/*
      - tsconfig.app.json
  > libs/
    - core/
      - src/*
      - tsconfig.lib.json
  node_modules/*
  package.json
  tsconfig.json
```

## Pre-requirement
- Node.js v14 or later
- Docker
- Docker Compose

## Installation
```bash
$ npm install
```

## Running services needed for apps
```bash
docker-compose up
```

## Running the main app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the queue app
```bash
# development
$ npm run start queue

# watch mode
$ npm run start:dev queue

# production mode
$ npm run start:prod queue
```

## Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License
This repo is [MIT licensed](LICENSE).
