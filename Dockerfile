# Stage 1 - the build process
FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "run", "server" ]