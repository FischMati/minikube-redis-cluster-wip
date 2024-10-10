#!/bin/bash

# Start Minikube with necessary configurations
minikube start --driver=docker --network-plugin=cni --cni=flannel

# Create the namespace
kubectl create namespace redis
kubectl create namespace mongodb
kubectl create namespace mongodbrq

# Deploy Redis Cluster with Helm
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
helm install my-redis-cluster bitnami/redis-cluster --namespace redis -f charts/redis-cluster/values.yaml
helm install my-mongodb bitnami/mongodb --namespace mongodb -f charts/mongodb/values.yaml
helm install mongodb-raw-queries bitnami/mongodb --namespace mongodbrq -f charts/mongodb-raw-queries/values.yaml

kubectl apply -f ./k8s

# Deploy your Express app
cd nest-app
pnpm run deploy

echo "Deployment complete!"
