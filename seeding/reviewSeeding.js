const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedReviews = async () => {
  const review = [];
  
  for (let i = 0; i < 2000; i++) {
    const star_rating = Math.round(faker.number.float({ min: 1, max: 5, precision: 0.1 }));
    const review_description = faker.lorem.sentences(4);

    review.push({
        star_rating,
        review_description
    });
  }

  console.log(`Number of reviews to seed: ${review.length}`);

  try {
    const client = await pool.connect();
    for (const reviews of review) {
      await client.query(`
        INSERT INTO reviews (
        star_rating,
        review_description
        )
        VALUES (
          $1, $2
        )
      `, [
        reviews.star_rating,
        reviews.review_description
      ]);
    }
    console.log("reviews seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding reviews:", error);
  }
};

module.exports = { seedReviews };