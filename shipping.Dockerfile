FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3001

ENTRYPOINT ["node", "/app/services/shipping/index.js"]

# docker build -t felipecod/micro-livraria/shipping -f shipping.Dockerfile .
# docker run -it --name shipping -p 3001:3001 felipecod/micro-livraria/shipping
# docker run -it --rm felipecod/micro-livraria/shipping
