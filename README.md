# devops

docker build -t node-app-image .

docker run -p 3000:3000 -d --name node-app node-app-image

docker run -it node /bin/bash

docker logs node-app

docker run -v ${PWD}:/app -p 3000:3000 -d --name node-app node-app-image

docker ps -a

// read only
sudo docker run -v ${PWD}:/app:ro -p 3000:3000 -d --name node-app node-app-image

docker run -v ${PWD}:/app --env-file ./.env -p 3000:3000 -d --name node-app node-app-image

// combine containers
docker-compose -f docker-compose.yml -f docker-compose.dev.yml
// then for prod
