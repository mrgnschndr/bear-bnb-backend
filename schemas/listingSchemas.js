const pool = require('../db/db.js');

const createListingsTable = async () => {
  const client = await pool.connect();

  try {
    console.log("Creating listings table...");

    // Listings table
    await client.query(`
      CREATE TABLE IF NOT EXISTS listings (
        listing_id SERIAL PRIMARY KEY, 
        host_id INTEGER REFERENCES host(host_id),
        listing_address TEXT,
        listing_city VARCHAR(50),
        listing_state VARCHAR(50),
        price_per_night MONEY,
        full_rating SMALLINT,
        main_image_url TEXT,
        list_image_url TEXT[],
        listing_title VARCHAR(50),
        listing_access VARCHAR(50),
        listing_max_guest SMALLINT,
        listing_bedrooms SMALLINT,
        listing_baths SMALLINT,
        is_self_checkin BOOLEAN,
        is_peaceful BOOLEAN,
        fun_tip VARCHAR(255),
        space_description TEXT,
        guest_access VARCHAR(255),
        notes TEXT,
        cleaning_fee MONEY,
        service_fee MONEY,
        number_reviews INTEGER,
        on_wishlist BOOLEAN,
        num_beds SMALLINT,
        pets_allowed BOOLEAN,
        instant_book BOOLEAN,
        property_type VARCHAR(20),
        views INTEGER,
        listing_tag VARCHAR(20),
        accessibility VARCHAR(50),
        checkin_time VARCHAR(20),
        checkout_time VARCHAR(20),
        allows_parties BOOLEAN,
        smoking_allowed BOOLEAN,
        wifi BOOLEAN,
        kitchen BOOLEAN,
        laundry BOOLEAN,
        air_conditioning BOOLEAN,
        heating BOOLEAN,
        pool BOOLEAN,
        free_parking BOOLEAN,
        gym BOOLEAN,
        coffee_maker BOOLEAN,
        free_breakfast BOOLEAN,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    `); 

    console.log("Table 'listings' created.");
    console.log("All tables created successfully."); 
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    client.release();
    // await pool.end(); 
  }
};

// Execute the script
createListingsTable()
  .then(() => console.log("Tables created successfully."))
  .catch((err) => console.error("Unexpected error:", err.message));