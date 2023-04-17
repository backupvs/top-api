## Description

API for website about the rating of various products. <i>(Currently is under development)</i>


## Running with Docker
1. Create and configure 'development.env' file in root directory:
```env
  # MONGODB
  MONGO_LOGIN=<login>
  MONGO_PASSWORD=<password>
  MONGO_HOST=mongo
  MONGO_PORT=2017
  MONGO_AUTHDATABASE=<db name>

  # JWT
  JWT_SECRET=<secret>
```
2. Create and configure 'mongo.env' file in root directory:
```env
  MONGO_INITDB_ROOT_USERNAME=<username>
  MONGO_INITDB_ROOT_PASSWORD=<password>
```
3. Type docker compose command:
```bash
$ docker-compose up --build -d
```
Then API will be hosted on <b>localhost:3000</b>.

## Running without Docker

1. Create and configure '.env' file as described in previous section.
2. Install dependencies:
```bash
$ npm install
```
5. Run app:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```