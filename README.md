# Hello World!

![Build and Deploy to GKE](https://github.com/campionfellin/cdk8s-cicd-example/workflows/Build%20and%20Deploy%20to%20GKE/badge.svg?branch=master)
![Deploy to Amazon EKS](https://github.com/campionfellin/cdk8s-cicd-example/workflows/Deploy%20to%20Amazon%20EKS/badge.svg?branch=master)

This example deploys a Node/Express server on GKE and EKS using Github Actions. These are the steps it (generally) takes:


1. Builds Docker image of application
2. Pushes Docker image to respective container registery (gcr or ecr)
3. Builds the k8s definition using cdk8s
4. Applies that k8s definition to the pre-existing cluster


As a result, if you change anything in `/application`, it will be deployed to both clusters when you push a commit.

Happy infrastructur-ing!
