FROM node:18

ARG PRODUCTION_CONNECTION_STRING
ARG API_KEY

WORKDIR /usr/src/app

COPY . .
RUN npm install --production

CMD ["npm", "start"]
