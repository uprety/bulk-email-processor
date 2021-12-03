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

EXPOSE 3030/tcp
EXPOSE 3030/udp

CMD [ "npm", "run", "startProd"]
