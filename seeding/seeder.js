const pool = require("../db/db.js");
const { seedUsers } = require('./userSeeding.js');
const { seedHosts } = require('./hostSeeding.js');
const { seedListings } = require('./listingSeeding.js');
const { seedReviews } = require('./reviewSeeding.js');

// Connection logging
pool.on('connect', () => console.log("Database connected successfully."));
pool.on('error', (err) => console.error("Database connection error:", err));
pool.on('end', () => console.log("Database pool has ended."));

const runAllSeeds = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Run seeds in order
    console.log("Seeding users...");
    await seedUsers();
    
    console.log("Seeding hosts...");
    await seedHosts();

    console.log("Seeding listings...");
    await seedListings();

    console.log("Seeding reviews...");
    await seedReviews();

    console.log("All seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    console.log("Database connection closed.");
  }
};

module.exports = { runAllSeeds };