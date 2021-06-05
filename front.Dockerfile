FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5000

CMD ["node", "/app/services/frontend/index.html"]
