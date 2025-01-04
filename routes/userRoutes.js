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

module.exports = router;