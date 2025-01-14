const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");
const pool = require("../db/db.js");

// GET all listings
router.get("/api/listings", async (req, res) => {
  try {
    const query = `
        SELECT *
        FROM listings
        ORDER BY listing_title DESC
    `;

    const result = await Pool.query(query);

    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No listings found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "Listings retrieved successfully"
    });

  } catch (error) {
    console.error("Error fetching listings:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching listings"
    });
  }
});

// GET request for individual listing
router.get('/api/listing/:listingId', async (req, res) => {
  const { listingId } = req.params;
  console.log('listing ID:', listingId);
  try {
    const result = await pool.query(
      `SELECT * FROM listings WHERE listing_id = $1`, [listingId]
    );

    // Check if the listing exists
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});







module.exports = router;