# Import CSV downloaded from dynamodb to your local dynamodb

[![Build status](https://travis-ci.org/limbuster/import-csv-to-dynamo-db.svg?master)](https://travis-ci.org/limbuster) [![Coverage Status](https://coveralls.io/repos/github/limbuster/import-csv-to-dynamo-db/badge.svg?branch=master)](https://coveralls.io/github/limbuster/import-csv-to-dynamo-db?branch=master)

This project is built so you can import data downloaded as CSV from AWS dynamodb to your local copy of dynamodb.

## Before running
Change the config.json to match your environment
```json
{
  "region": "ap-southeast-1",
  "endpoint": "http://127.0.0.1:8000"
}
```

Create new table matching the `sample.csv` format or any table you want to import the csv file into
```bash
aws dynamodb --endpoint-url http://localhost:8000 create-table \
--attribute-definitions AttributeName=email,AttributeType=S AttributeName=fullName,AttributeType=S \
--table-name sample \
--key-schema AttributeName=email,KeyType=HASH AttributeName=fullName,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

## Running from within the cloned directory
Install the dependencies
```
npm i 
```

Link the bin directory
```
npm link
```

Then run the actual command
```
import-csv-to-dynamo -t <table_name> <path-to-csv>
```

## Verify
```bash
aws dynamodb --endpoint-url http://localhost:8000 scan --table-name sample
```