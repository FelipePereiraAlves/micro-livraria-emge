FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3002

CMD ["node", "/app/services/inventory/index.js"]
