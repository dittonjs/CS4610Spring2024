FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./api.ts ./api.ts

EXPOSE 3010

RUN yarn install

CMD [ "yarn", "api" ]