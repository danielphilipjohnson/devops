# Setup project

$ git clone git@github.com:gitumarkk/kubernetes_django.git
$ cd kubernetes_django/deploy/kubernetes/
$ git checkout part_4-redis-celery# Configure minikube
$ minikube start
$ eval $(minikube docker-env)
$ minikube dashboard # Open dashboard in new browser# Apply Manifests
$ kubectl apply -f postgres/ # See dashboard in browser
$ kubectl apply -f redis/
$ kubectl apply -f django/
$ kubectl apply -f celery/
$ kubectl apply -f flower/# Show services in browser
$ minikube service django-service # Wait if not ready
$ minikube service flower-service# Delete cluster when done
$ minikube delete
