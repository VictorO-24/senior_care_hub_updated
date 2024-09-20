// /config/pinecone.js
const pinecone = require("pinecone-client");

const pineconeClient = new pinecone.PineconeClient();

pineconeClient.init({
  environment: "us-west1-gcp", // Adjust the environment
  apiKey: process.env.PINECONE_API_KEY,
});

module.exports = pineconeClient;
