echo "Creating swarm services in stack eventcheckin..."
docker stack deploy -c docker-compose.yml eventcheckin

sleep 5
echo "Done!"
docker service ls

