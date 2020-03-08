import { Deployment, Service, Ingress } from '../imports/k8s'
import { Construct } from '@aws-cdk/core';
import { Chart } from 'cdk8s';

export interface MicroServiceProps {
  containerName: string
  image: string
  replicas?: number
}

export class MicroService extends Construct {
  constructor(scope: Chart, id: string, props: MicroServiceProps) {
    super(scope, id);

    // Different services for GKE vs EKS due to some EKS configuration issues...
    if (process.env.GKE_PROJECT != undefined) {
      new Service(this, `service`, {
        spec: {
          type: 'LoadBalancer',
          ports: [ { port: 80, targetPort: 8080 } ],
          selector: { app: this.node.uniqueId }
        }
      });
    } else {
      new Service(this, `service`, {
        spec: {
          type: 'NodePort',
          ports: [ { port: 80, targetPort: 8080 } ],
          selector: { app: this.node.uniqueId }
        },
        metadata: {
          annotations: {
            'kubernetes.io/ingress.class': 'alb'
          }
        }
      });
      new Ingress(this, 'ingress', {
        metadata: {
          annotations: {
            'kubernetes.io/ingress.class': 'alb',
            'alb.ingress.kubernetes.io/scheme': 'internet-facing',
            'alb.ingress.kubernetes.io/target-type': 'ip'
          }
        },
        spec: {
          rules: [
            {
              http: {
                paths: [
                  {
                    path: '/*',
                    backend: {
                      serviceName: 'hello-k8s-microservice1-service-dbbaa4c6',
                      servicePort: 80
                    }
                  }
                ]
              }
            }
          ]
        }
      })
    }

    new Deployment(this, `deployment`, {
      spec: {
        replicas: props.replicas || 2,
        selector: {
          matchLabels: { app: this.node.uniqueId }
        },
        template: {
          metadata: { labels: { app: this.node.uniqueId } },
          spec: {
            containers: [
              {
                name: props.containerName,
                image: props.image,
                ports: [ { containerPort: 8080 } ]
              }
            ]
          }
        }
      }
    });
  }
}
