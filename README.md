<!--suppress HtmlDeprecatedAttribute -->
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

## Application flow
<img src="sa.png" alt="Application flow" />

## Pre-requirement
- Node.js v14 or later
- Docker
- Docker Compose

## Starting
- Installation
```bash
# problem-statement >
$ npm install
```
- Copy `.env.example` to `.env`

- Running services needed for apps
```bash
# problem-statement >
$ docker-compose up
```

- Running the main app (another terminal)
```bash
# problem-statement >
$ npm run start
```

- Running the queue app (another terminal)
```bash
# problem-statement >
$ npm run start queue
```

### 
- Get token:

```bash
$ curl --location --request POST 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "user1",
    "password": "123123"
}'
```
- Start import
```bash
$ curl --location --request POST 'localhost:3000/transaction/import' \
--header 'Authorization: Bearer <xxx.xxx.xxx>' \
--form 'file=@"/path/to/sample-transaction-import-file.xlsx"'
```

- Describe execution
```bash
$ curl --location --request GET 'http://localhost:3000/execution/describe/<execution-id-here>' \
--header 'Authorization: Bearer <xxx.xxx.xxx>'
```


## Test
```bash
# problem-statement >
$ npm run test
```

## License
This repo is [MIT licensed](LICENSE).
