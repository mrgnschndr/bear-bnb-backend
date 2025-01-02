const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");

// AUTH MIDDLEWARE??????????

// GET user's phone number
router.get("/api/users/me/phone", auth, async (req, res) => {
  const userId = req.user.user_id; // Does the Auth middleware provide the ID?

  try {
    const query = `
            TODO: Figure out the SQL for this once we have the data
        `;

    const result = await Pool.query(query, [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        phoneNumber: // TODO: Figure out value
      }
    });
  } catch (error) {
    console.error("Error fetching phone number:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching phone number",
    });
  }
});
