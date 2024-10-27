#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkMgdStack } from '../lib/cdk-mgd-stack';

const app = new cdk.App();
new CdkMgdStack(app, "CdkMgdStack-cyber-dev", {
  env: { region: "ap-northeast-2" },
})