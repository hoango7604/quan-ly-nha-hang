#!/usr/bin/env sh

source ./constants.sh .

echo "Removing swarm services in stack '$stackname'..."
docker stack rm $stackname
echo "Done!"

docker service ls

