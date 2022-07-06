# Problem statement

[![Mit License](https://img.shields.io/github/license/liemlylac/problem-statement)](https://github.com/liemlylac/problem-statement/blob/main/LICENSE)


Badges From SonarQube:
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=liemlylac_problem-statement&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=liemlylac_problem-statement)

Badges From CodeClimate
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/liemlylac/problem-statement)
![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/liemlylac/problem-statement)
![Code Climate coverage](https://img.shields.io/codeclimate/coverage/liemlylac/problem-statement)
![Code Climate issues](https://img.shields.io/codeclimate/issues/liemlylac/problem-statement)

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
