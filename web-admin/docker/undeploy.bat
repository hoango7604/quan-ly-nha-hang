echo "Removing swarm services in stack eventcheckin..."
docker stack rm $stackname
echo "Done!"

docker service ls

