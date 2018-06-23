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

  dynamodb.batchWriteItem(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
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
