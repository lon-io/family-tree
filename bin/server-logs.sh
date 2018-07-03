#!/bin/bash
HEROKU_APP_NAME=lon-family-tree-server
IMAGE_NAME=familytreeserver
COMPOSE_PATH=server/docker-compose.yml

if [[ $1 == "-d" ]] ; then
    # Deploy logs
    heroku logs --app ${HEROKU_APP_NAME}
else
    # Dev logs
    docker-compose -f ${COMPOSE_PATH} -p ${IMAGE_NAME} logs -tf
fi
