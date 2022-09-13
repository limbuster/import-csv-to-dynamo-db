const AWS = require('aws-sdk');

// https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html
const MAX_DYNAMODB_BATCH_WRITE_SIZE = 25;

function createPutRequest(schema, data){
  return {
    PutRequest: {
      Item: schema.reduce((acc, item, index) => {
        const object = data[index];
        if(!object){
          return acc;
        }
        let obj = {};
        if(item.type === 'M'){
          if(object){
            obj = {[`${item.type}`]: JSON.parse(object)};
          }
        }else{
          obj = {[`${item.type}`]: object};
        }
        return Object.assign(acc, {[`${item.name}`]: obj});
      }, {}),
    },
  };
}

function batchWriteItem(dynamodb, tableName, requests){
  const batchCount = Math.ceil(requests.length / MAX_DYNAMODB_BATCH_WRITE_SIZE);
  let counter = 0;
  let error = false;
  return new Promise(async (resolve, reject) => {
    const res = await asyncForEach(split(requests, MAX_DYNAMODB_BATCH_WRITE_SIZE), async(patch, i) => {
      const params = {
        RequestItems: {
          [tableName]: patch,
        },
      };
      await dynamodb.batchWriteItem(params, (err, data) => {
        counter++;
        console.log(`Batch ${counter}`);
        if(err){
          reject(err);
          error = true;
        }else if(counter === batchCount){
          resolve(error ? "ERROR": "SUCCESS");
        }
      });
    });
  });
}

function split(arr, n){
  let res = [];
  while(arr.length){
    res.push(arr.splice(0, n));
  }
  return res;
}

async function asyncForEach(array, asyncCallback){
  const promises = [];
  for(let index = 0; index < array.length; index++){
    promises.push(asyncCallback(array[index], index, array));
  }
  await Promise.all(promises);
}

function init(config){
  const dynamodb = new AWS.DynamoDB(config);
  return {
    batchWriteItem: batchWriteItem.bind(null, dynamodb),
  };
}

module.exports = {
  init,
  createPutRequest,
};
