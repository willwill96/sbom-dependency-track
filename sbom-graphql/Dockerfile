FROM node:16-alpine

WORKDIR /graphql
COPY package.json .
COPY package-lock.json .
RUN npm i install
COPY . .
CMD ["npm", "run", "start"]