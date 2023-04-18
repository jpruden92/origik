# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./front/package.json ./
COPY ./front/package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY ./front/. ./
RUN npm run build

# production environment
FROM node:16-alpine
WORKDIR /app
COPY ./back/. ./
RUN npm install --silent

COPY --from=build /app/build ./public

EXPOSE 5001
CMD ["node", "index.js"]