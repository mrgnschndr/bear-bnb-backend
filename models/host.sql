CREATE TABLE IF NOT EXISTS host (
    host_id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(user_id),
    is_superhost BOOLEAN DEFAULT FALSE, -- is this is a superhost?
    number_reviews INTEGER DEFAULT 0, -- number of reviews
    host_rating SMALLINT, -- star rating of host
    date_hosted DATE, -- date the host started hosting
    listing_id SERIAL, -- listing id owned
    host_bio TEXT, -- bio of host
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);