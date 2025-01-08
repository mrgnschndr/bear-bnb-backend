const pool = require("../db/db.js");
const { faker } = require('@faker-js/faker');

const seedListings = async () => {
  const listing = [];
  
  try {
    const client = await pool.connect();
    const hostResult = await client.query(`
      SELECT host_id
      FROM host
      ORDER BY host_id
    `);
    
    const hostIds = hostResult.rows.map(row => row.host_id);
    
    if (hostIds.length === 0) {
      throw new Error("No hosts found in the database. Please seed hosts first.");
    }

  for (let i = 0; i < 50; i++) {
      const randomHostId = hostIds[Math.floor(Math.random() * hostIds.length)];
      const title = faker.word.adjective({ length: { max: 7 } })+" "+ faker.word.adjective({ length: { max: 7 } }) +" " + faker.word.noun({ length: { max: 7 }})+" home";
      const access = ["Partial House", "Whole House"];
      const randomNumber2 = Math.floor(Math.random() * 2)
      const randomNumber4 = Math.floor(Math.random() * 4)
      const randomNumber10 = Math.floor(Math.random() * 10)
      const propertyType = ["House", "Apartment", "Guesthouse", "Hotel"]
      const listingTag = ["Icons", "Mansions", "Lakefront", "Amazing views", "Cabins", "Treehouses", "Castles", "Countryside", "Tropical", "Trending"]
      const accessible = ["step-free access", "accessible parking space", "shower grab bar", "toilet grab bar"]

      const listing_address = faker.location.streetAddress();
      const listing_city = faker.location.city();
      const listing_state = faker.location.state()
      const price_per_night = faker.commerce.price({ min: 39, max: 1500, dec: 0, symbol: '$' })
      const full_rating = Math.round(faker.number.float({ min: 1, max: 5, precision: 0.1 }));
      const main_image_url = faker.image.urlLoremFlickr(({ category: 'nature' }));
      const list_image_url = [faker.image.urlLoremFlickr(({ category: 'nature' })), faker.image.urlLoremFlickr(({ category: 'nature' })), faker.image.urlLoremFlickr(({ category: 'nature' })), faker.image.urlLoremFlickr(({ category: 'nature' })), faker.image.urlLoremFlickr(({ category: 'nature' })), faker.image.urlLoremFlickr(({ category: 'nature' }))];
      const listing_title = title;
      const listing_access = access[randomNumber2];
      const listing_max_guest = faker.number.int({ min: 2, max: 15 });
      const listing_bedrooms = faker.number.int({ min: 3, max: 7 })
      const listing_baths = faker.number.int({ min: 1, max: 5 });
      const is_self_checkin = faker.datatype.boolean(0.7);
      const is_peaceful = faker.datatype.boolean(0.7);
      const fun_tip = faker.lorem.sentences(2);
      const space_description = faker.lorem.sentences(4);
      const guest_access = listing_access;
      const notes = faker.lorem.sentences(2);
      const cleaning_fee = faker.commerce.price({ min: 50, max: 100, dec: 0, symbol: '$' });
      const service_fee = faker.commerce.price({ min: 30, max: 150, dec: 0, symbol: '$' });
      const number_reviews = faker.number.int({ min: 0, max: 500 });
      const on_wishlist = false;
      const num_beds = listing_max_guest;
      const pets_allowed = faker.datatype.boolean(0.3);
      const instant_book = faker.datatype.boolean(0.4);
      const property_type = propertyType[randomNumber4];
      const views = faker.number.int({ min: 0, max: 5000 });
      const listing_tag = listingTag[randomNumber10];
      const accessibility = accessible[randomNumber4];
      const checkin_time = "3:00 PM"
      const checkout_time = "11:00 AM"
      const allows_parties = faker.datatype.boolean(0.1);
      const smoking_allowed = faker.datatype.boolean(0.1);
      const wifi = faker.datatype.boolean(0.9);
      const kitchen = faker.datatype.boolean(0.9);
      const laundry = faker.datatype.boolean(0.8);
      const air_conditioning = faker.datatype.boolean(0.9);
      const heating = faker.datatype.boolean(0.9);
      const pool = faker.datatype.boolean(0.5);
      const free_parking = faker.datatype.boolean(0.7);
      const gym = faker.datatype.boolean(0.2);
      const coffee_maker = faker.datatype.boolean(0.7);
      const free_breakfast = faker.datatype.boolean(0.3);

      listing.push({
        host_id: randomHostId,
        listing_address,
        listing_city,
        listing_state,
        price_per_night,
        full_rating,
        main_image_url,
        list_image_url,
        listing_title,
        listing_access,
        listing_max_guest,
        listing_bedrooms,
        listing_baths,
        is_self_checkin,
        is_peaceful,
        fun_tip,
        space_description,
        guest_access,
        notes,
        cleaning_fee,
        service_fee,
        number_reviews,
        on_wishlist,
        num_beds,
        pets_allowed,
        instant_book,
        property_type,
        views,
        listing_tag,
        accessibility,
        checkin_time,
        checkout_time,
        allows_parties,
        smoking_allowed,
        wifi,
        kitchen,
        laundry,
        air_conditioning,
        heating,
        pool,
        free_parking,
        gym,
        coffee_maker,
        free_breakfast
      });
    }

    console.log(`Number of listings to seed: ${listing.length}`);

    for (const listings of listing) {
      await client.query(`
        INSERT INTO listings (
        host_id,
        listing_address,
        listing_city,
        listing_state,
        price_per_night,
        full_rating,
        main_image_url,
        list_image_url,
        listing_title,
        listing_access,
        listing_max_guest,
        listing_bedrooms,
        listing_baths,
        is_self_checkin,
        is_peaceful,
        fun_tip,
        space_description,
        guest_access,
        notes,
        cleaning_fee,
        service_fee,
        number_reviews,
        on_wishlist,
        num_beds,
        pets_allowed,
        instant_book,
        property_type,
        views,
        listing_tag,
        accessibility,
        checkin_time,
        checkout_time,
        allows_parties,
        smoking_allowed,
        wifi,
        kitchen,
        laundry,
        air_conditioning,
        heating,
        pool,
        free_parking,
        gym,
        coffee_maker,
        free_breakfast
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
          $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
          $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44
        )
      `, [
        listings.host_id,
        listings.listing_address,
        listings.listing_city,
        listings.listing_state,
        listings.price_per_night,
        listings.full_rating,
        listings.main_image_url,
        listings.list_image_url,
        listings.listing_title,
        listings.listing_access,
        listings.listing_max_guest,
        listings.listing_bedrooms,
        listings.listing_baths,
        listings.is_self_checkin,
        listings.is_peaceful,
        listings.fun_tip,
        listings.space_description,
        listings.guest_access,
        listings.notes,
        listings.cleaning_fee,
        listings.service_fee,
        listings.number_reviews,
        listings.on_wishlist,
        listings.num_beds,
        listings.pets_allowed,
        listings.instant_book,
        listings.property_type,
        listings.views,
        listings.listing_tag,
        listings.accessibility,
        listings.checkin_time,
        listings.checkout_time,
        listings.allows_parties,
        listings.smoking_allowed,
        listings.wifi,
        listings.kitchen,
        listings.laundry,
        listings.air_conditioning,
        listings.heating,
        listings.pool,
        listings.free_parking,
        listings.gym,
        listings.coffee_maker,
        listings.free_breakfast
      ]);
    }
    console.log("listings seeded successfully");
    client.release();
  } catch (error) {
    console.error("Error seeding listings:", error);
  }
};

module.exports = { seedListings };