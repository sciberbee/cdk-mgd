import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';

export class CdkMgdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'CdkMgdBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY, // the bucket will be deleted when the stack is deleted
      autoDeleteObjects: true, // force all objects to get deleted during bucket deletion
    });

    const queue = new sqs.Queue(this, 'CdkMgdQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3n.SqsDestination(queue),
      { prefix: 'input/' } // input/ prefix에만 이벤트 발생
    );
  }
}
