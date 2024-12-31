const pool = require("./db/db.js");
const faker = require("faker");

const seedUsers = async () => {
  const users = [];
  
  // TODO: Create 100 Users 10 have to be host
  for (let i = 0; i < 100; i++) {
    
    //TODO: Add proper faker data
    // Example fake usage
    const name = faker.name.findName();
    const email = faker.internet.email();
    users.push({ name, email, createdAt });
  }

  try {
    const client = await pool.connect();
    for (const user of users) {
      await client.query(
        `
        INSERT INTO users (
          name,
          email,
          created_at
        ) VALUES (
          $1,
          $2,
          $3
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
