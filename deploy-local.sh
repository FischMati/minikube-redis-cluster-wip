#!/bin/bash

# Start Minikube with necessary configurations
minikube start --driver=docker --network-plugin=cni --cni=flannel

# Create the namespace
kubectl create namespace redis

# Deploy Redis Cluster with Helm
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install my-redis-cluster bitnami/redis-cluster --namespace redis -f charts/redis-cluster/values.yaml

# Deploy your Express app
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Deployment complete!"
