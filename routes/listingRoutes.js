const express = require("express");
const router = express.Router();
const Pool = require("../db/db.js");
const pool = require("../db/db.js");

// GET all listings
router.get("/api/listings", async (req, res) => {
  try {
    const query = `
        SELECT listing_id,
            listing_address,
            listing_city,
            listing_state,
            price_per_night,
            full_rating,
            main_image_url,
            list_image_url,
            listing_title,
            listing_access,
            listing_max_guest,
            listing_bedrooms,
            listing_baths,
            is_self_checkin,
            is_peaceful,
            fun_tip,
            space_description,
            guest_access,
            notes,
            cleaning_fee,
            service_fee,
            number_reviews,
            on_wishlist,
            num_beds,
            pets_allowed,
            instant_book,
            property_type,
            views,
            listing_tag,
            accessibility,
            checkin_time,
            checkout_time,
            allows_parties,
            smoking_allowed,
            wifi,
            kitchen,
            laundry,
            air_conditioning,
            heating,
            pool,
            free_parking,
            gym,
            coffee_maker,
            free_breakfast,
            created_at,
            updated_at
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
router.get("api/listing/:listingId", async (req, res) => {
  const { listingId } = req.params;
  console.log('listing ID:', listingId);
  try {
    const result = await pool.query(
      `SELECT * FROM listings WHERE listing_id = $1`,[listingId]
    );
    res.status(200).json(result.rows);

  } catch(error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    })
  }

})






module.exports = router;