#!/usr/bin/env node
const getArgs = require('../lib/get-args');
const { readCSV, getSchema } = require('../lib/csv');
const { init, createPutRequest } = require('../lib/dynamo-db-client');
const config = require('../config');

const args = getArgs();

(async () => {
  try {
    const data = await readCSV(args.file);
    const schema = getSchema(data[0]);
    const putRequests = data.slice(1).map(createPutRequest.bind(null, schema));
    const dynamodbClient = init(config);
    const result = await dynamodbClient.batchWriteItem(args.table, putRequests);
    console.info(result);
  } catch (e) {
    console.error(e);
  }
})();
