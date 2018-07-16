#!/bin/bash
IMAGE_TAG=`date +%s`
HEROKU_APP_NAME=lon-family-tree-server
IMAGE_NAME=registry.heroku.com/${HEROKU_APP_NAME}/web:${IMAGE_TAG}

# Alternative (Tho this seems to never update the release (Todo: Investigate))
# docker login --username=_ --password=$(heroku auth:token) registry.heroku.com
# docker build -t ${IMAGE_NAME} server/.
# docker push ${IMAGE_NAME}
# heroku container:release web --app ${HEROKU_APP_NAME}
# heroku open --app ${HEROKU_APP_NAME}

cd ./server
heroku container:login
heroku container:push web --app ${HEROKU_APP_NAME}
heroku container:release web --app ${HEROKU_APP_NAME}

cd ../

heroku open --app ${HEROKU_APP_NAME}
