const pool = require("./db/db.js");
const faker = require("faker");

const seedUsers = async () => {
  const users = [];
  
  for (let i = 0; i < 100; i++) {
    
    const user_first_name = faker.name.firstName();
    const user_last_name = faker.name.lastName();
    const user_city = faker.address.city();
    const user_state = faker.address.state();
    const user_country = faker.address.country();
    const is_logged_in = false;
    
    // TODO: Make this more random than just the first 10 users
    const is_host = i < 10; // First 10 users are hosts

    const user_email = faker.internet.email(user_first_name, user_last_name);
    const user_birth_month = faker.date.past().getMonth() + 1; // 1-12
    const user_birth_day = faker.date.past().getDate(); // 1-31
    const user_birth_year = faker.date.past().getFullYear(); // Get a past year (for the birth year)
    const user_phone = faker.phone.phoneNumber();
    const user_image_url = faker.image.avatar(); // Random avatar image URL

    users.push({
      user_first_name,
      user_last_name,
      user_city,
      user_state,
      user_country,
      is_logged_in,
      is_host,
      user_email,
      user_birth_month,
      user_birth_day,
      user_birth_year,
      user_phone,
      user_image_url
    });
  }
  
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
