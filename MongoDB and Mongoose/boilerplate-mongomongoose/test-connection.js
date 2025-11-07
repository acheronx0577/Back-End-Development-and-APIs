require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Current directory:', __dirname);

// Check if MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not found in .env file');
  console.log('Please make sure you have a .env file with MONGO_URI defined');
  process.exit(1);
}

console.log('✅ MONGO_URI loaded successfully');

// Show first part of MONGO_URI (without password) for debugging
const mongoUri = process.env.MONGO_URI;
const displayUri = mongoUri.replace(/:(.*)@/, ':***@');
console.log('Connection string:', displayUri);

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

mongoose.connection.on('connected', () => {
  console.log('✅ Successfully connected to MongoDB Atlas!');
  mongoose.connection.close();
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Connection error:', err.message);
  console.log('Please check:');
  console.log('1. Your MongoDB Atlas connection string in the .env file');
  console.log('2. Your username and password are correct');
  console.log('3. Network access is enabled in MongoDB Atlas');
  console.log('4. Your database user exists in Database Access');
});