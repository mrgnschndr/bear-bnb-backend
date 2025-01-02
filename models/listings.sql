CREATE TABLE IF NOT EXISTS listings (
    listing_id SERIAL PRIMARY KEY, -- listing id
    listing_address TEXT, -- listing address
    listing_city VARCHAR(50), -- listing city
    listing_state VARCHAR(50), -- listing state
    price_per_night MONEY, -- price of listing per night
    full_rating SMALLINT, -- full star rating of listing
    main_image_url TEXT, -- url of main image
    list_image_url TEXT, -- url of other listing images
    listing_title VARCHAR(50), -- title of listing
    listing_access VARCHAR(50), -- does guest have partial house or entire house
    listing_max_guest SMALLINT, -- max amount of guests allowed
    listing_bedrooms SMALLINT, -- the amount of bedrooms in the listing
    listing_baths SMALLINT,  -- the amount of bathrooms in the listing
    host_id SERIAL, -- host id
    is_self_checkin BOOLEAN, -- can you self check in?
    is_peaceful BOOLEAN,  -- is the area peaceful?
    fun_tip VARCHAR(255), -- anything special about the listing
    space_description TEXT, -- description about the space
    guest_access, -- note about listing access
    notes, TEXT -- other things to note about the listing
    cleaning_fee MONEY, --listing cleaning fee 
    service_fee MONEY, -- listing service fee
    number_reviews INTEGER, -- number of reviews
    review_id SERIAL, -- review id
    on_wishlist BOOLEAN, -- is the item wishlisted by the current user
    num_beds SMALLINT, -- number of beds on the property
    pets_allowed BOOLEAN, -- are pets allowed at the listing?
    instant_book BOOLEAN, -- can you instant book at the property?
    property_type VARCHAR(20), -- house, apartment, or guesthouse filter
    views INTEGER, -- how many views the listing has
    listing_tag VARCHAR(20), -- the fun filter
    accessibility VARCHAR(50), -- accessiblity filter
    checkin_time VARCHAR(20), -- check in time
    checkout_time VARCHAR(20), -- check out time
    allows_parties BOOLEAN, -- does the property allow parties?
    smoking_allowed BOOLEAN, -- is smoking allowed?
    wifi BOOLEAN, -- wifi amenity?
    kitchen BOOLEAN, -- full kitchen amenity?
    laundry BOOLEAN, -- laundry amenity?
    air_conditioning BOOLEAN, -- air conditioning amenity?
    heating BOOLEAN, -- heating amenity?
    pool BOOLEAN, -- pool feature?
    free_parking BOOLEAN, -- free parking feature?
    gym BOOLEAN, -- gym feature?
    coffee_maker BOOLEAN, -- coffee maker feature?
    free_breakfast BOOLEAN -- free breakfast feature?
);