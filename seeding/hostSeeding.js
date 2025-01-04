const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedHosts = async () => {
  const hosts = [];
  
  for (let i = 0; i < 100; i++) {
    
    const is_superhost = 0 //faker data;
    const number_reviews = 0 //faker data;
    const host_rating = 0 //faker data;
    const date_hosted = 0 //faker data;
    const host_bio = 0 //faker data;

    console.log(hosts);

    hosts.push({
        is_superhost,
        number_reviews,
        host_rating,
        date_hosted, // We could prob get rid of this since we have created at
        host_bio
    });
  }

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

// Seed all tables in order
const seedDatabase = async () => {
  await seedHosts();
  console.log("Host seeding complete!");
  pool.end(); // Close the pool
};

seedDatabase();