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

# This will be used by heroku for deploying
ENV PORT=${PORT:-3030}

EXPOSE ${PORT}/tcp
EXPOSE ${PORT}/udp

CMD [ "npm", "run", "startProd"]
