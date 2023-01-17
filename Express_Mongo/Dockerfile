FROM node:16-alpine AS deps

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install

USER node

COPY --chown=node:node . .

CMD ["node", "index.js"]
