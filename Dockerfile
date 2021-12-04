# syntax=docker/dockerfile:1

FROM node

WORKDIR /app/frontend
COPY ["frontend/package.json", "frontend/package-lock.json", "./"]
RUN npm install

WORKDIR /app/backend
COPY ["backend/package.json", "backend/package-lock.json", "./"]
RUN npm install

WORKDIR /app
COPY . .

WORKDIR /app/frontend
RUN npm run build

WORKDIR /app/backend

# The port will be assigned by heroku for running container
ENV PORT=${PORT:-3030}

EXPOSE ${PORT}/tcp
EXPOSE ${PORT}/udp

# For seeding mail template into databse
# CMD [ "npm", "run", "seedMailTemplate"] 

# For consuming queue
# CMD [ "npm", "run", "consumeQueue"]

# Running the main app
CMD [ "npm", "run", "startProd"]
