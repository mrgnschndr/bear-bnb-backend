const pool = require('../db/db.js');

const createUserTable = async () => {
  const client = await pool.connect();

  try {
    console.log("Creating users table...");

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          user_id SERIAL PRIMARY KEY,
          user_first_name VARCHAR(50),
          user_last_name VARCHAR(50),
          user_city VARCHAR(50),
          user_state VARCHAR(50),
          user_country VARCHAR(50),
          is_logged_in BOOLEAN,
          is_host BOOLEAN,
          user_email VARCHAR(255) UNIQUE,
          user_birth_month SMALLINT CHECK (user_birth_month BETWEEN 1 AND 12),
          user_birth_day SMALLINT CHECK (user_birth_day BETWEEN 1 AND 31),
          user_birth_year SMALLINT,
          user_phone VARCHAR(20),
          user_image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `); 

    console.log("Table 'users' created.");
    console.log("All tables created successfully."); 
  } catch (err) {
    console.error("Error creating tables:", err.message);
  } finally {
    client.release();
    await pool.end(); 
  }
};

// Execute the script
createUserTable()
  .then(() => console.log("Tables created successfully."))
  .catch((err) => console.error("Unexpected error:", err.message));