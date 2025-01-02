CREATE TABLE IF NOT EXISTS host (
    user_id SERIAL PRIMARY KEY, -- user id
    host_id SERIAL, -- host id
    is_superhost BOOLEAN, -- is this is a superhost?
    number_reviews INTEGER, -- number of reviews
    host_rating SMALLINT, -- star rating of host
    date_hosted DATE, -- date the host started hosting
    listing_id SERIAL, -- listing id owned
    host_bio TEXT -- bio of host
);