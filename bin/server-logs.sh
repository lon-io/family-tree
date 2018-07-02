#!/bin/bash
IMAGE_NAME=familytreeserver
COMPOSE_PATH=server/docker-compose.yml

docker-compose -f ${COMPOSE_PATH} -p ${IMAGE_NAME} logs -tf
