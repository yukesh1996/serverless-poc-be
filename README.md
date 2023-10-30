# AWS Lambda Node.js Typescript

## What is AWS Lambda function ?
AWS Lambda is an Amazon Web Services serverless computing service, sometimes known as FaaS (Function as a Service). It supports a diverse set of possible triggers, such as incoming HTTP requests, messages from a queue, customer emails, changes to database records, and much more. AWS Lambda also allows you to concentrate on your core product and business logic rather than maintaining the operating system (OS), access control, and so on.

## How AWS Lambda works?
Clients give information to Lambda. Clients might be anyone who sends AWS Lambda queries. This might be an application or one of Amazon's other services.
Lambda takes requests and, according on the size, amount, or volume of the data, executes them. Requests are then sent to a function for processing. 

# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

```
npm i serverless -g
serverless create --template aws-nodejs-typescript --path stocks-api
```

## Installation/deployment instructions

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

## Test your service

### Locally

In order to test the scraper function locally, run the following command:

- `npm install serverless-offline --save-dev`
- `serverless offline`
- `npx sls invoke local -f scraper --path src/functions/scraper/mock.json` if you're using NPM

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `name` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/scraper' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Frederic"
}'
```

## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions               # Lambda configuration and source code folder
│   │   ├── scraper
│   │   │   ├── handler.ts      # `scraper` lambda source code
│   │   │   ├── index.ts        # `scraper` lambda Serverless configuration
│   │   │   ├── mock.json       # `scraper` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `scraper` lambda input event JSON-Schema
|   |   ├── product
│   │   │   ├── handler.ts      # `product` lambda source code
│   │   │   ├── index.ts        # `product` lambda Serverless configuration
│   │   │   ├── mock.json       # `product` lambda input parameter, if any, for local invocation
│   │   │   └── schema.ts       # `product` lambda input event JSON-Schema
│   │   │
│   │   └── index.ts            # Import/export of all lambda configurations
│   │
│   └── libs                    # Lambda shared code
│       └── apiGateway.ts       # API Gateway specific helpers
│       └── handlerResolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts           # Lambda middleware
│
├── package.json
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
└── webpack.config.js           # Webpack configuration
```

## Architecture

![Architecture](https://raw.githubusercontent.com/yukesh1996/articles/main/images/lambda.drawio.png)

## Screenshots

![Product Scrapper](https://raw.githubusercontent.com/yukesh1996/articles/main/images/ProductScrap.png)

![Scrapped Products](https://raw.githubusercontent.com/yukesh1996/articles/main/images/Scrappedproducts.png)

# Conclusion
Using AWS Lambda, We can build a service without managing servers. We now pay for what We've consumed rather than a set amount each month.
