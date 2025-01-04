const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedHosts = async () => {
  const hosts = [];
  
  for (let i = 0; i < 10; i++) {
    
    const number_reviews = faker.number.int({ min: 0, max: 500 }); // Corrected for version 9.3.0
    const host_rating = Math.round(faker.number.float({ min: 1, max: 5, precision: 0.1 }));
    const is_superhost = number_reviews > 100 && host_rating === 5.0; // Superhost condition
    const date_hosted = faker.date.past(10).toISOString(); // Random date within the past 10 years
    const host_bio = faker.lorem.sentence(); // Random short sentence as bio

    hosts.push({
        is_superhost,
        number_reviews,
        host_rating,
        date_hosted, // We could prob get rid of this since we have created at
        host_bio
    });
  }

  console.log(`Number of hosts to seed: ${hosts.length}`);

  try {
    const client = await pool.connect();
    for (const host of hosts) {
      await client.query(`
        INSERT INTO host (
        is_superhost
        , number_reviews
        , host_rating
        , date_hosted 
        , host_bio
        )
        VALUES (
          $1, $2, $3, $4, $5
        )
      `, [
        host.is_superhost,
        host.number_reviews,
        host.host_rating,
        host.date_hosted,
        host.host_bio
      ]);
    }
    console.log("host seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding host:", error);
  }
};

module.exports = { seedHosts };