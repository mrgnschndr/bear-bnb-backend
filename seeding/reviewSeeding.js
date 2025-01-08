const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedReviews = async () => {
  try {
    const client = await pool.connect();
    
    // Get all user IDs to randomly assign reviewers
    const userResult = await client.query(`
      SELECT user_id FROM users
    `);
    
    // Get all listing IDs to randomly assign reviews to listings
    const listingResult = await client.query(`
      SELECT listing_id FROM listings
    `);
    
    console.log(`Found ${userResult.rows.length} users and ${listingResult.rows.length} listings`);
    
    if (!userResult.rows.length || !listingResult.rows.length) {
      console.error("No users or listings found. Make sure to seed users and listings first.");
      client.release();
      return;
    }

    const userIds = userResult.rows.map(row => row.user_id);
    const listingIds = listingResult.rows.map(row => row.listing_id);

    // Create 100 reviews
    for (let i = 0; i < 100; i++) {
      // Randomly select a user and listing for each review
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const listingId = listingIds[Math.floor(Math.random() * listingIds.length)];
      
      const star_rating = Math.floor(faker.number.int({ min: 1, max: 5 }));
      const review_description = faker.lorem.paragraphs(2);
      await client.query(`
        INSERT INTO reviews (
          user_id,
          listing_id,
          star_rating,
          review_description
        )
        VALUES (
          $1, $2, $3, $4
        )
      `, [
        userId,
        listingId,
        star_rating,
        review_description
      ]);

      if (i % 100 === 0) {
        console.log(`Seeded ${i} reviews...`);
      }
    }
    
    console.log("Reviews seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding reviews:", error);
    throw error;
  }
};

module.exports = { seedReviews };