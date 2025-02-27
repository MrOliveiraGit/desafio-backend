FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
RUN yarn build