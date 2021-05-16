FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

CMD ["node", "/app/services/controller/index.js"]
