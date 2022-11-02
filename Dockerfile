FROM node:16.15-alpine3.14

RUN apk add --no-cache bash

WORKDIR /home/node/app

USER node
