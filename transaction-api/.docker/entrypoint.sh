#!/bin/bash

./.docker/wait-for-it.sh -t 50 mongo:27017 -- \
./.docker/wait-for-it.sh -t 50 redis:6379 -- \
sh -c "npm install && npm start"