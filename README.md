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
```
4. Run frontend application
```
cd bulk-email-processor
cd frontend
npm run start
```
5. In new terminal inside bulk-email-processor directory 
```
cd backend
npm run start
```
6. Open the following url to open the webapp
>[localhost:3333](http://localhost:3333)