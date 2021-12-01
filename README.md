# Bulk Email Processor

This is a webapp fo sending email to bulk email receipants present in excel file.

## Getting Started
1. Get the repo in your local directory.
>`git clone https://github.com/uprety/bulk-email-processor.git`
2. This project uses mongodb as a database. If you do not have have one, sign up to [www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database) for a remote mongodb.
3. Configure all the folloing environmental variables.
```
BEP_ENV='development or production'
BEP_SESSION_SECRET='a long random characters'
BEB_MONGODB_URI='your mongodb uri such as mongodb://localhost:27017/mydbname'
BEP_SERVER_URL="http://localhost:3333"

BEP_MAILTRAP_HOST="smtp.mailtrap.io for mailtrap"
BEP_MAILTRAP_USERNAME="264f1e1559d20d"
BEP_MAILTRAP_PASSWORD="1a9cacb884f386"
BEP_CLIENT_HOST="localhsot:3333"

REACT_APP_SERVER_URL="http://localhost:3333"
```
4. Run frontend application
```
cd bulk-email-processor
cd frontend
npm install
npm run start
```
5. In new terminal inside bulk-email-processor directory 
```
cd backend
npm install
npm run start
```
6. Open the following url to open the webapp
>[localhost:3333](http://localhost:3333)
