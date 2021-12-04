# Bulk Email Processor

This is a webapp fo sending email to bulk email receipants present in excel file.

## Getting Started
1. Get the repo in your local directory.
>`git clone https://github.com/uprety/bulk-email-processor.git`

2. You need the following services in order to work:
```
1. MongoDb Server
2. Mail Server
3. Message Broker Server
```

3. Configure all the folloing environmental variables.
```
BEP_SERVER_URL="this app url where end user hit the addresss for backend; it is usually http://localhost:3030 in development"
BEP_ENV="development"
BEP_SESSION_SECRET="app secret code"

BEP_MONGODB_URL="your mongoDb URL with credentials"

BEP_MAILTRAP_CREDENTIAL="smtp://<mailtrap username>:<mailtrap password>@smtp.mailtrap.io:2525?pool=true&maxConnection=1&rateDelta=20&rateLimit=5"

CLOUDAMQP_URL="your message broker URL with credentials"

```

4. In do following to run backend app packages: 
```
cd bulk-email-processor
cd backend
npm install 
```
If you have not loaded Emali Template into Databse, do the seeding with `npm run migrate` command.<br/>Then **`npm run start`** to run the server 
If you want not in development environment and want to consume message manually run  `npm run consume`. 

5. In new terminal inside `bulk-email-processor` directory run frontend application:
```
cd frontend
npm install
npm run start
```

6. Open the following url to open the webapp [localhost:3000](http://localhost:3000)

## Current Design
![Screenshot](./img/current_design.jpg)

## Ideal Design
This app can be implemented in this way but required little bit of twiking
![Screenshot](./img/ideal_design.jpg)
