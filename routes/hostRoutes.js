const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");

// GET all Hosts
router.get("/api/hosts", async (req, res) => {
  try {
    const query = `
        SELECT * FROM host
    `;

    const result = await Pool.query(query);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No hosts found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "hosts retrieved successfully"
    });

  } catch (error) {
    console.error("Error fetching hosts:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching hosts"
    });
  }
});

module.exports = router;