# STEPS TO DEPLOY THIS API

1. Clone repository
```bash
git clone git@github.com:fishviche/api-report.git
cd api-report
```
2. Download the backup and unzip
URL: https://drive.google.com/file/d/1CCcL2AeeKTzX-6pkysBOleqJN4-ntE89/view?usp=sharing
```bash
unzip testdb.zip
```
3. Configure .env and docker-compose with db name and db password.

4. Execute the docker compose
```bash
docker-compose up -d
```

5. Upload data from sql
```bash
docker exec -i <container-id> psql -U <db-name> < $(pwd)/testdb.sql
```

## Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org/)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Docker support**
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)  

### **API Description**

This API seeks to register complaints regarding cleanliness and crime. The complaints are registered with their location and the user needs to be registered to be able to enter their complaint. Reports can have a score from 1 to 10 and comments.

Simple flow example:

- The user registers.
- The user registers his complaint with the data obtained from other APIs.

### **API Endpoints**

List of available routes:

**Category routes**:\
`GET /category/get-category` - get category\
`GET /category/sub-category/get-sub-category` - get sub-category\
`POST /category/sub-category/add-category` - add sub-category\

**Reporters routes**:\
`GET /reporter/get-reporter?document_number=` - get reporter\
`POST /reporter/add-reporter` - add reporter\

**Reports routes**:\
`GET /report/get-report` - get reports\
`POST /report/add-report` - add report\

**Locations routes**:\
`GET /location/get-states?country_id=` - get states\
`GET /location/get-province?state_id=` - get provinces\
`GET /location/get-district?province_id=` - get districts\

**Excel routes**:\
`GET report-excel/get-report-excel` - get excel\
`GET report-excel/get-report-by-district` - get report by district\


### **API POSTMAN DOCUMENTACION / EXAMPLES**

https://documenter.getpostman.com/view/15831629/2s935oM4k9