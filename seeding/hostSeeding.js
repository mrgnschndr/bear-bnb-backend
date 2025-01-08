const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedHosts = async () => {
  try {
    const client = await pool.connect();

    const usersWhoAreHosts = await client.query(`
      
      SELECT user_id
      FROM users
      WHERE is_host = true
      ORDER BY user_id

      `);

      const hostUserIds = usersWhoAreHosts.rows.map(row => row.user_id);
      // console.log(` there are this many rows ${hostUserIds}`);


  
  for (const userId of hostUserIds) {
    
    const number_reviews = faker.number.int({ min: 0, max: 500 }); // Corrected for version 9.3.0
    const host_rating = Math.round(faker.number.float({ min: 1, max: 5, precision: 0.1 }));
    const is_superhost = host_rating === 5.0; // Superhost condition
    const date_hosted = faker.date.past(10).toISOString(); // Random date within the past 10 years
    const host_bio = faker.lorem.sentence(); // Random short sentence as bio

    // hosts.push({
    //     is_superhost,
    //     number_reviews,
    //     host_rating,
    //     date_hosted, // We could prob get rid of this since we have created at
    //     host_bio
    // });
  // }

  // console.log(`Number of hosts to seed: ${hosts.length}`);

  // try {
    // const client = await pool.connect();
    // for (const host of hosts) {
      await client.query(`
        INSERT INTO host (
        user_id
        , is_superhost
        , number_reviews
        , host_rating
        , date_hosted 
        , host_bio
        )
        VALUES (
          $1, $2, $3, $4, $5, $6
        )
      `, [
        userId,
        is_superhost,
        number_reviews,
        host_rating,
        date_hosted,
        host_bio
      ]);
    }
    console.log("host seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding host:", error);
  }
};

module.exports = { seedHosts };