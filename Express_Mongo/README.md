# Express with MongoDB
App with express and Mongo as DB.

## Requirements
- Mongo
- Node
- Docker (If you want)
## To test
Create a .env file with provided variables 
```sh
DB_MONGO_URI='mongodb://127.0.0.1:27017/express-crud'
```
And run:
```sh
node index.js
```
## To test with docker
Run
```sh
docker-compose up -d
```