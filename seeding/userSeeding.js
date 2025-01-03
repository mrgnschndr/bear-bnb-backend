const pool = require("./db/db.js");
const faker = require("faker");

const seedUsers = async () => {
  const users = [];
  
  // TODO: Create 100 Users 10 have to be host
  for (let i = 0; i < 100; i++) {
    
    const user_first_name = faker.name.findName();
    const user_last_name = faker.internet.email();
    const user_city = faker.location.city();
    const user_state = faker.location.;
    const user_country = ;
    const is_logged_in = ;
    const is_host = ;
    const user_email = ;
    const user_birth_month = ;
    const user_birth_day = ;
    const user_birth_year = ;
    const user_phone =;
    const user_image_url = ;
    users.push({ name, email, createdAt });
  }

  try {
    const client = await pool.connect();
    for (const user of users) {
      await client.query(`
        INSERT INTO users (
          user_first_name
          ,user_last_name
          ,user_city
          ,user_state
          ,user_country
          ,is_logged_in
          ,is_host
          ,user_email
          ,user_birth_month
          ,user_birth_day
          ,user_birth_year
          ,user_phone
          ,user_image_url
          )
        VALUES (
          $1
          ,$2
          ,$3
          ,$4
          ,$5
          ,$6
          ,$7
          ,$8
          ,$9
          ,$10
          ,$11
          ,$12
          ,$13
        )
      `,
        [user.name, user.email, user.createdAt]
      );
    }
    console.log("Users seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

// Seed all tables in order
const seedDatabase = async () => {
  await seedUsers();
  // await seedListings();
  // await seedBookings();
  console.log("Database seeding complete!");
  pool.end(); // Close the pool
};

seedDatabase();
