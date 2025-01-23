const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

// Import routes
const usersRouter = require('./routes/userRoutes');
const listingsRouter = require('./routes/listingRoutes');
const reviewsRouter = require('./routes/reviewsRoute');
const hostRouter = require('./routes/hostRoutes');

const app = express();
const port = process.env.PORT || 5004;

// Configuration for Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'http://localhost:5004',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

// Middleware
app.use(cors());
app.use(express.json());

// Route to get user profile
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Route to check authentication status
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Routes
app.use(usersRouter);
app.use(listingsRouter);
app.use(reviewsRouter);
app.use(hostRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log('Airbnb Clone Backend is live!');
});