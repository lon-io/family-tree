#!/bin/bash

IMAGE_NAME=familytreeserver
COMPOSE_PATH=server/docker-compose.yml

# Use docker-compose to run a container;
if [[ $1 == "-b" ]] ; then
    docker-compose -f ${COMPOSE_PATH} -p ${IMAGE_NAME} up -d --build
else
    docker-compose -f ${COMPOSE_PATH} -p ${IMAGE_NAME} up -d
fi

# Attach to STDIN
echo "Attaching to running container ..."
docker exec -it ${IMAGE_NAME} sh -c "bash"

# Clean up after exiting from bash
echo "Cleaning up ..."
docker-compose -f ${COMPOSE_PATH} -p ${IMAGE_NAME} down
