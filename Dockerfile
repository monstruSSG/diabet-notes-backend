FROM keymetrics/pm2:12-alpine
# FROM node:12-alpine AS build

RUN apk add bash mc

WORKDIR /app

COPY ./package.json ./
COPY ./pm2.config.js ./

RUN yarn --production

COPY src ./src
COPY files ./files

# RUN yarn build

CMD ["pm2-runtime" , "pm2.config.js"]