#!/bin/bash

./.docker/wait-for-it.sh -t 50 transaction-checker:4000 -- \
sh -c "npm install && npm start"