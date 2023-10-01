FROM node:18
WORKDIR /usr/src/survey-api

COPY ./package.json .
RUN npm install --only=prod

COPY ./build ./build
EXPOSE 5000
CMD npm start