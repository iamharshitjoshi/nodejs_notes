const mongoose = require('mongoose');
// define the MongoDB conncection URL 

const mongoURL = 'mongodb+srv://harshit123:harshit12345@cluster0.a1xnyrq.mongodb.net/newdb' // replace 'mydatabase' with database name

// set up MongoDB connection 
mongoose.connect(mongoURL, {
    // Use new options and remove deprecated options
   
    useNewUrlParser: true, // This can be removed safely without impacting the connection
    useUnifiedTopology: true // This can also be removed safely without impacting the connection
 
  });

// get the default connection by default object 
// Mongoose maintains a default connection object representing the MongoDB connection 
// db - object hai jo mongoose ko maintain krta hai connection establish krne mai
const db = mongoose.connection;

// define event listener for database connection 

db.on('error', (err)=>{
    console.error('mongoDB connection error', err);
});

db.on('connected', ()=>{
    console.log('connected to mongoDB server');
});

module.exports = db;

