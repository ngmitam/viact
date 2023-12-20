# viAct

## Description

A clone version of https://viact.net/ using ReactJS, NextJS and mySQL.

## Installation

download the project and run the following command in the terminal

```bash
npm install
```

## Usage

### Development

#### Frontend

```bash
npm run start:frontend
```

#### Backend

```bash
npm run start:backend:dev
```

### Testing

```bash
npm run test
```

Test e2e with jest. Should have mysql running on port 3306 and configured

```bash
host: 'localhost',
user: 'test_user',
password: 'test_password',
database: 'test_db',
```

```bash
npm run test:e2e
```

### Production

```bash
npm run build
npm run start:backend:prod
```

### Docker

build docker image

```bash
docker compose build
```

run docker image

```bash
docker compose up
```

## Contact

ngmitamit@gmail.com
