JavaScript

const pool = require('../db/db.js');

const createUserTable = async () => {
  const client = await pool.connect();

  try {
    console.log("Creating users table...");

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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