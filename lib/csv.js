const csv = require('fast-csv');
const fs = require('fs');

function readCSV(file) {
  return new Promise((resolve) => {
    const dataArray = [];
    const stream = fs.createReadStream(file);
    const csvStream = csv()
      .on('data', data => dataArray.push(data))
      .on('end', () => {
        stream.close();
        resolve(dataArray);
      });
    stream.pipe(csvStream);
  });
}

function getSchema(data) {
  return data.map((item) => {
    const parts = item.split(' ');
    return { name: parts[0], type: parts[1].replace(/[()]/g, '') };
  });
}

module.exports = {
  readCSV,
  getSchema,
};
