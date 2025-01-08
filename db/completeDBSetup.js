// Create initial pool for creating the DB in postgres
const { Pool } = require('pg');
// const pool = require('../db/db.js');
require('dotenv').config();
const { runAllSeeds } = require('../seeding/seeder.js');

const pool1 = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: 'postgres', // Connect to default database to create a new one
    password: process.env.DB_PASS,
    port: process.env.POOL_PORT,
});

const completeDBSetup = async () => {
    
    try {
        // Drop the database if it exists
        await pool1.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} dropped successfully.`);
        
        // Create the database
        await pool1.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created successfully.`);
        
        // Connect to the new database
        pool1.end();
        
        // We are referencing the const pool from here to the end of the file
        const pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.NODE_ENV === 'test' ? process.env.DB_TEST_NAME : process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: process.env.POOL_PORT,
        });
        
        const client = await pool.connect();

        console.log("Creating 'beardb' DB...");

        console.log("Creating all tables...");
        // Create users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                user_first_name VARCHAR(100),
                user_last_name VARCHAR(100),
                user_city VARCHAR(100),
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
        if (await client.query(`SELECT * FROM users`)) {
            console.log("Table 'users' created.");
        }

        // Create host table
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
        if (await client.query(`SELECT * FROM host`)) {
            console.log("Table 'host' created.");
        };

        // Create listings table
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
        if (await client.query(`SELECT * FROM listings`)) {
            console.log("Table 'listings' created.");
        };

        // Create reviews table
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
        if (await client.query(`SELECT * FROM reviews`)) {
            console.log("Table 'reviews' created.");
        }

        // Check all tables were created successfully
        if (await client.query(`SELECT * FROM users`) && await client.query(`SELECT * FROM host`) && await client.query(`SELECT * FROM listings`) && await client.query(`SELECT * FROM reviews`)) {
            console.log("All tables created successfully.");
        }

        // Seed all tables
        console.log("Seeding all tables...");
        await runAllSeeds();

        pool.end()
        client.release();


    } catch (err) {
        console.error("Error creating tables:", err.message);
    }
};

// Execute the function
completeDBSetup()
    .then(() => {
        console.log("Database 'beardb' setup completed.")
        })
    .catch((err) => console.error("Unexpected error:", err.message));