FROM node:lts

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
COPY ./index.ts ./index.ts

EXPOSE 3000

RUN yarn install

CMD [ "yarn", "dev" ]