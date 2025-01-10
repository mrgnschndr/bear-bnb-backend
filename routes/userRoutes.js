const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");

// GET all users
router.get("/api/users", async (req, res) => {
  try {
    const query = `
      SELECT user_id
        , user_first_name
        , user_last_name
        , user_city
        , user_state
        , user_country
        , user_email
        , user_birth_month
        , user_birth_day
        , user_birth_year
        , user_phone
        , created_at
        , updated_at
        ,user_econtact_name
        ,user_econtact_relationship
        ,user_econtact_email
        ,user_econtact_phone
      FROM users
      ORDER BY user_first_name DESC
    `;
    const result = await Pool.query(query);
    
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No users found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "Users retrieved successfully"
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users"
    });
  }
});

// Define a PUT route that handles updating user information
// :userId in the path means this is a URL parameter (e.g., /api/users/123)
router.put("/api/users/:userId", async (req, res) => {
  
  // Extract the userId from the URL parameters
  // If URL is /api/users/123, then userId will be "123"
  const { userId } = req.params;

  // Get the update data from the request body
  // This will be an object like { user_phone: "555-1234", user_email: "new@email.com" }
  const updates = req.body;

  try {
    // Build the SET clause for our SQL query dynamically based on what fields were sent
    // Object.keys(updates) gets all the field names from the updates object
    const setClause = Object.keys(updates)
      // .map() transforms each field name into "field_name = $1" format
      // We use $1, $2, etc. as placeholders to prevent SQL injection
      // index + 1 because SQL uses 1-based indexing for parameters
      .map((key, index) => `${key} = $${index + 1}`)
      // .join(', ') combines all the field updates with commas between them
      // Example: "user_phone = $1, user_email = $2"
      .join(', ');

    // Construct the complete SQL query
    // ${setClause} inserts our dynamic SET clause
    // The last parameter ($${Object.keys(updates).length + 1}) is for the WHERE clause
    // RETURNING * means return all columns of the updated row
    const query = `
      UPDATE users
      SET ${setClause}
      WHERE user_id = $${Object.keys(updates).length + 1}
      RETURNING *
    `;

    // Create array of values to match our SQL parameters ($1, $2, etc.)
    // [...Object.values(updates)] spreads all the update values into an array
    // userId is added at the end for the WHERE clause parameter
    const values = [...Object.values(updates), userId];

    // Execute the query with our values array
    // Pool.query() returns a promise, which is why we use await
    const result = await Pool.query(query, values);

    // Send successful response back to client
    // status(200) means the request was successful
    // result.rows[0] contains the updated user data
    return res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User updated successfully"
    });

  } catch (error) {
    // If anything goes wrong in the try block, this code runs
    // Log the error to the console for debugging
    console.error("Error:", error);
    
    // Send error response back to client
    // status(500) means server error
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});


module.exports = router;