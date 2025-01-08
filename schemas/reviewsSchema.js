const pool = require('../db/db.js');

const createReviewsTable = async () => {
  const client = await pool.connect();

  try {
    console.log("Creating reviews table...");

    // Reviews table
    await client.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            review_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            listing_id INTEGER REFERENCES listings(listing_id),
            star_rating SMALLINT CHECK (star_rating BETWEEN 1 AND 5),
            review_description TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    `); 

    console.log("Table 'reviews' created.");
    console.log("All tables created successfully."); 
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    client.release();
    // await pool.end(); 
  }
};

// Execute the script
createReviewsTable()
  .then(() => console.log("Tables created successfully."))
  .catch((err) => console.error("Unexpected error:", err.message));