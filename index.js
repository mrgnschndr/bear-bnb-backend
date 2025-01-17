const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const { pool } = require('./tests/jest.poolTest.js');

dotenv.config({ path: '.env.test' });

const app = express();
const port = process.env.APP_PORT || 5001; 


// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const hostRoutes = require('./routes/hostRoutes');
const reviewsRoutes = require('./routes/reviewsRoute');

app.use('/users', userRoutes);
app.use('/listing', listingRoutes);
app.use('/hosts', hostRoutes);
app.use('/reviews', reviewsRoutes);

// app.get('/api/users', async (req, res) => {
//   try {
//     const query = `
//     SELECT * 
//     FROM users
//     ORDER BY name
//     `;
//     const res = await pool.query(query);
//     return res.status(200).json({
//       success: true,
//       data: result.rows,
//       message: "Users retrieved successfully"
//     });
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while fetching users"
//     });
// }})

// Start the server

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on ${process.env.APP_URL}:${port}`);
  });
}

module.exports = app;