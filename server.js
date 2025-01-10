const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

// Import routes
const usersRouter = require('./routes/userRoutes');
const listingsRouter = require('./routes/listingRoutes')

const hostRouter = require('./routes/hostRoutes')

const app = express();
const port = process.env.PORT || 5001; 

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use(usersRouter);
app.use(listingsRouter);

app.use(hostRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`); 
  console.log('Airbnb Clone Backend is live!'); 
});