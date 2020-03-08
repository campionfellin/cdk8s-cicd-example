import { App, Chart } from 'cdk8s';
import { Construct } from '@aws-cdk/core';
import { MicroService } from './lib/microservice';

export class HelloKube extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    if (process.env.GKE_PROJECT != undefined) {
      new MicroService(this, 'microservice1', {
        containerName: 'localcontainer',
        image: `gcr.io/${process.env.GKE_PROJECT}/hello-cdk8s:${process.env.GITHUB_SHA}`,
        replicas: 2
      });
    } else {
      new MicroService(this, 'microservice1', {
        containerName: 'localcontainer',
        image: `${process.env.AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/hello-cdk8s:${process.env.GITHUB_SHA}`,
        replicas: 2
      });
    }

  }
}

const app = new App();
new HelloKube(app, 'hello-k8s');
app.synth();