require('dotenv').config();

const { MongoClient, ServerApiVersion  } = require('mongodb');
const uri = `mongodb+srv://dwisgolmog:${process.env.DB_PWD}@cluster0.vhwu9v6.mongodb.net/?retryWrites=true&w=majority`;
let client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

module.exports = client;