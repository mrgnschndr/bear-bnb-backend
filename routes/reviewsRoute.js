const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");

// GET all Reviews
router.get("/api/reviews", async (req, res) => {
  try {
    const query = `
        SELECT * FROM reviews;
    `;

    const result = await Pool.query(query);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No Reviews found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "Reviews retrieved successfully"
    });

  } catch (error) {
    console.error("Error fetching Reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Reviews"
    });
  }
});

module.exports = router;