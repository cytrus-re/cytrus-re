FROM node:15.2.0-alpine

WORKDIR /cytrus-re

ENV HOSTNAME="Docker-Production"

COPY ./ /cytrus-re

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python && apk add make build-base gcc abuild binutils && npm install

CMD ["node", "cybase.js"]