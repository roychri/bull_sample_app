FROM node:14.8.0-alpine3.12

ARG NODE_ENV=production
ARG USER=node

RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

COPY package*.json ./

RUN if [ "$NODE_ENV" = "production" ]; then npm ci --only=production; else npm install; fi

COPY src/ ./src

CMD [ "node", "src/index.js" ]

USER $USER
