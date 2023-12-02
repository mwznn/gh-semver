FROM node:lts-alpine

COPY package*.json ./
RUN npm ci

COPY index.js ./

ENTRYPOINT [ "node", "index.js" ]