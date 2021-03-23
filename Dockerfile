FROM node:14.16-alpine as build

WORKDIR /app

COPY src src/
COPY package.json yarn.lock tsconfig.json rename.js .postcssrc .browserslistrc ./

RUN yarn
RUN yarn build

FROM nginx:1.19.2-alpine

COPY --from=build /app/build/ /usr/share/nginx/html
COPY nginx /etc/nginx/

EXPOSE 80 443