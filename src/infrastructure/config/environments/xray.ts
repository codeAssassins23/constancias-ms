import * as AWSXRay from 'aws-xray-sdk';
import { envs } from './envs';

export function configureXRay() {
  const deamonAddress = envs.xray.daemonAddress;
  AWSXRay.setDaemonAddress(deamonAddress);

  AWSXRay.captureHTTPsGlobal(require('http'));
  AWSXRay.captureHTTPsGlobal(require('https'));

  if (envs.nodeEnv === 'production') {
    AWSXRay.config([AWSXRay.plugins.EC2Plugin]);
  }
}
