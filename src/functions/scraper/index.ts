import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  iamRoleStatements: [
    {
      Effect: 'Allow',
      Action: 'dynamodb:BatchWriteItem',
      Resource: 'arn:aws:dynamodb:us-east-2:259629159728:table/products',
    },
  ],
  events: [
    {
      http: {
        method: 'post',
        path: 'scraper',
        cors: true,
        request: {
          schemas: {
            'application/json': schema,
          },
        },
      },
    },
  ],
};
