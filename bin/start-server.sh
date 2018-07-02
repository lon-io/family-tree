#!/usr/bin/env bash

# Use docker-compose to run a container;
if [[ $1 == "-b" ]] ; then
    docker-compose -p family_tree_server up -d --build
else
    docker-compose -p family_tree_server up -d
fi

# Attach to STDIN
echo "Attaching to running container ..."
docker exec -it family_tree_server sh -c "bash"

# Clean up after exiting from bash
echo "Cleaning up ..."
docker-compose -p family_tree_server down
