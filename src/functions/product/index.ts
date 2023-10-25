import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: 'dynamodb:Scan',
      Resource: 'arn:aws:dynamodb:us-east-2:259629159728:table/products',
    },
  ],
  events: [
    {
      http: {
        method: 'get',
        path: 'product',
        cors: true,
      },
    },
  ],
};
