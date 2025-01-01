CREATE TABLE IF NOT EXISTS host (
    user_id SERIAL PRIMARY KEY,
    host_id SERIAL
    is_superhost BOOLEAN
    number_reviews INTEGER
    host_rating SMALLINT
    date_hosted DATE
    listing_id SERIAL
    host_bio TEXT
);