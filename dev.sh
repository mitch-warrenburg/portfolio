#!/usr/bin/env sh

docker-compose up -d
yarn start &

cd ../portfolio-server
./gradlew bootrun &

cd ../portfolio-chat-server
yarn start &


