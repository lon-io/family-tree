#!/bin/bash
HEROKU_APP_NAME=lon-family-tree-server
IMAGE_NAME=registry.heroku.com/${HEROKU_APP_NAME}/web

docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
docker build -t ${IMAGE_NAME} server/.
docker push ${IMAGE_NAME}
heroku container:release web --app ${HEROKU_APP_NAME}
heroku open --app ${HEROKU_APP_NAME}
