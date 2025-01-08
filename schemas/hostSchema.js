const pool = require('../db/db.js');

const createHostTable = async () => {
  const client = await pool.connect();

  try {
    console.log("Creating host table...");

    // Users table
    await client.query(`
        CREATE TABLE IF NOT EXISTS host (
            host_id SERIAL PRIMARY KEY,
            user_id INTEGER UNIQUE REFERENCES users(user_id),
            is_superhost BOOLEAN DEFAULT FALSE,
            number_reviews INTEGER DEFAULT 0,
            host_rating SMALLINT,
            date_hosted DATE,
            host_bio VARCHAR(255),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `); 

    console.log("Table 'host' created.");
    console.log("All tables created successfully."); 
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    client.release();
    // await pool.end(); 
  }
};

// Execute the script
createHostTable()
  .then(() => console.log("Tables created successfully."))
  .catch((err) => console.error("Unexpected error:", err.message));