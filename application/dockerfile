FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install -L
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]