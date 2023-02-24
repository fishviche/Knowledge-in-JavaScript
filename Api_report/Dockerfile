FROM node:14.21-alpine3.16

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install

USER node

EXPOSE 3000

CMD ["node", "src/index.js"]