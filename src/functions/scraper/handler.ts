import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
import * as AWS from 'aws-sdk';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { uid } from 'uid';

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const scraper: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    
    const response = await axios.get(event.body.website);
    const htmlContent = response.data;

    
    const $ = cheerio.load(htmlContent);

    const products: any[] = [];

    
    $('.product').each((index, element) => {
      const product = {
        productId: `product-${uid()}`,
        productName: $(element).find('.name').text(),
        productDescription: $(element).find('.description').text(),
        productUrl: $(element).find('img').attr('src'),
        productPrice: $(element).find('.price').text(),
      };
      products.push(product);
    });
    if (!products?.length) {
      throw new Error("No products can be scraped!");
    }
    const putRequests = products.map((product) => ({
      PutRequest: {
        Item: product,
      },
    }));

    const params = {
      RequestItems: {
        'products': putRequests,
      },
    };

    await dynamoDB.batchWrite(params).promise();

    return formatJSONResponse({ message: 'Data stored in DynamoDB' }, 200);
  } catch (error) {
    return formatJSONResponse({ message: `Error: ${error.message}` }, 500);
  }
};

export const main = middyfy(scraper);
