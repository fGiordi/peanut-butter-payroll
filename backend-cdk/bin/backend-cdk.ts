#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendCdkStack } from '../lib/backend-cdk-stack';

const app = new cdk.App();
new BackendCdkStack(app, 'BackendCdkStack');
