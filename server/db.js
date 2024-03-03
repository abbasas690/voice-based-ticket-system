const { MongoClient } = require('mongodb');

// MongoDB connection URI

const uri = 'mongodb://localhost:27017/bus_system';
// mongodb://localhost:27017

// Options for MongoDB connection

// Establish MongoDB connection
const dbConnection = MongoClient.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Export the Mongoose connection instance
module.exports = dbConnection;
