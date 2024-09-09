FROM node:alpine

WORKDIR /home/ubuntu/test

COPY package.json .

RUN npm install

COPY . .

CMD npm run migrate && npm run build && npm run start:prod
