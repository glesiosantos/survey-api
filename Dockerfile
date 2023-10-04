FROM node:18
WORKDIR /usr/src/survey-api

COPY ./package.json .
RUN npm install --omit=dev
