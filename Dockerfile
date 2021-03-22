FROM node:14.16-alpine as build

WORKDIR /app

COPY src src/
COPY package.json yarn.lock tsconfig.json rename.js .postcssrc .browserslistrc ./

RUN yarn
RUN yarn build

FROM nginx:1.19.2-alpine

ARG DOMAIN

ENV DOLLAR="$"
ENV SERVER_URL=http://portfolio-server-service
ENV CHAT_WS_URL=http://portfolio-chat-service
ARG CHAT_API_URL=http://portfolio-chat-api-service

COPY --from=build /app/build/ /usr/share/nginx/html
COPY nginx /etc/nginx/

RUN envsubst < /etc/nginx/nginx.template > /etc/nginx/nginx.conf

EXPOSE 80 443