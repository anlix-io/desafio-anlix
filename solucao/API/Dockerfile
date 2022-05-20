FROM node:16.15-alpine
WORKDIR /api
COPY package*.json .
RUN npm install
COPY ..
EXPOSE 21262
CDM ["npm", "start"]