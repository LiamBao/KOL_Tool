FROM node:latest

RUN npm install -g vue-cli
RUN npm install -g nodemon

WORKDIR /tmp
COPY ./package.json /tmp/
RUN npm install

WORKDIR /src