#!/bin/bash

./.docker/wait-for-it.sh -t 50 rabbitmq:15672 -- \
sh -c "npm install && npm start"