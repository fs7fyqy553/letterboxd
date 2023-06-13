FROM node:18

ARG PUBLIC_API_URL
ARG API_KEY

WORKDIR /usr/src/app

COPY . .
RUN npm install --production
RUN npm run build
CMD ["npm", "start"]
