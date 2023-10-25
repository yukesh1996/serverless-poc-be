import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const fetchProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    
    const params: any = {
      TableName: 'products',
    };

    const result = await dynamoDB.scan(params).promise();

    return formatJSONResponse({ message: 'Data fetched from DynamoDB', data: result.Items }, 200);
  } catch (error) {
    return formatJSONResponse({ message: `Error: ${error.message}` }, 500);
  }
};

export const main = middyfy(fetchProduct);
