const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedUsers = async () => {
  const users = [];
  
  for (let i = 0; i < 100; i++) {
    
    const user_first_name = faker.person.firstName();
    const user_last_name = faker.person.lastName();

    const user_nickname = ""
    const user_address_one = faker.location.streetAddress();
    const user_apt = faker.location.secondaryAddress();
    const user_postal_code = faker.location.zipCode();

    const user_city = faker.location.city();
    const user_state = faker.location.state();
    const user_country = faker.location.country();
    const is_logged_in = false;

    const user_econtact_name = faker.person.firstName();
    const user_econtact_relationship = "";
    const user_econtact_email = faker.internet.email(user_first_name, user_last_name);
    const user_econtact_phone = faker.phone.number({ style: 'national' });
    
    // TODO: Make this more random than just the first 10 users
    const is_host = i < 10; // First 10 users are hosts

    const user_email = faker.internet.email(user_first_name, user_last_name);
    const user_birth_month = faker.date.past().getMonth() + 1; // 1-12
    const user_birth_day = faker.date.past().getDate(); // 1-31
    const user_birth_year = faker.date.past().getFullYear(); // Get a past year (for the birth year)
    const user_phone = faker.phone.number({ style: 'national' })
    const user_image_url = faker.image.avatar(); // Random avatar image URL

    // console.log(users);

    users.push({
      user_first_name,
      user_last_name,
      user_nickname,
      user_address_one,
      user_apt,
      user_city,
      user_state,
      user_country,
      user_postal_code,
      is_logged_in,
      is_host,
      user_email,
      user_birth_month,
      user_birth_day,
      user_birth_year,
      user_phone,
      user_image_url,
      user_econtact_name,
      user_econtact_relationship,
      user_econtact_email,
      user_econtact_phone
    });
  }

  try {
    const client = await pool.connect();
    for (const user of users) {
      await client.query(`
        INSERT INTO users (
          user_first_name
          ,user_last_name
          ,user_nickname
          ,user_address_one
          ,user_apt
          ,user_city
          ,user_state
          ,user_country
          ,user_postal_code
          ,is_logged_in
          ,is_host
          ,user_email
          ,user_birth_month
          ,user_birth_day
          ,user_birth_year
          ,user_phone
          ,user_image_url
          ,user_econtact_name
          ,user_econtact_relationship
          ,user_econtact_email
          ,user_econtact_phone
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        )
      `, [
        user.user_first_name,
        user.user_last_name,
        user.user_nickname,
        user.user_address_one,
        user.user_apt,
        user.user_city,
        user.user_state,
        user.user_country,
        user.user_postal_code,
        user.is_logged_in,
        user.is_host,
        user.user_email,
        user.user_birth_month,
        user.user_birth_day,
        user.user_birth_year,
        user.user_phone,
        user.user_image_url,
        user.user_econtact_name,
        user.user_econtact_relationship,
        user.user_econtact_email,
        user.user_econtact_phone
      ]);
    }
    console.log("Users seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

module.exports = { seedUsers };