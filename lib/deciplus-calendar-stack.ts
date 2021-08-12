import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda-nodejs'

export class DeciplusCalendarStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.NodejsFunction(this, 'DeciplusCalendarFunction', {
      entry: 'src/index.ts'
    })
  }
}
