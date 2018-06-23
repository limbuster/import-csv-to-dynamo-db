const AWS = require('aws-sdk');

function createPutRequest(schema, data) {
  return {
    PutRequest: {
      Item: schema.reduce((acc, item, index) => {
        const object = data[index];
        if (!object) {
          return acc;
        }
        let obj = {};
        if (item.type === 'M') {
          if (object) {
            obj = { [`${item.type}`]: JSON.parse(object) };
          }
        } else {
          obj = { [`${item.type}`]: object };
        }
        return Object.assign(acc, { [`${item.name}`]: obj });
      }, {}),
    },
  };
}

function batchWriteItem(dynamodb, tableName, requests) {
  const params = {
    RequestItems: {
      [tableName]: requests,
    },
  };
  return new Promise((resolve, reject) => {
    dynamodb.batchWriteItem(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function init(config) {
  const dynamodb = new AWS.DynamoDB(config);
  return {
    batchWriteItem: batchWriteItem.bind(null, dynamodb),
  };
}

module.exports = {
  init,
  createPutRequest,
};
