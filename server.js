const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
// (user routes)
// (listing routes)
// (booking routes)??
// (review routes)??

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
  console.log('Airbnb Clone Backend is live!'); 
});