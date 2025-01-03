        INSERT INTO users (
          user_first_name 
          , user_last_name
          , user_city 
          , user_state 
          , user_country 
          , is_logged_in 
          , is_host
          , user_email 
          , user_birth_month 
          , user_birth_day
          , user_birth_year
          , user_phone
          , user_image_url
        ) VALUES (
          $1
          , $2
          , $3
          , $4
          , $5
          , $6
          , $7
          , $8
          , $9
          , $10
          , $11
          , $12
          , $13

            
            
            
            
            
        --   user_id SERIAL PRIMARY KEY,
          user_first_name VARCHAR(50),
          user_last_name VARCHAR(50),
          user_city VARCHAR(50),
          user_state VARCHAR(50),
          user_country VARCHAR(50),
          is_logged_in BOOLEAN,
          is_host BOOLEAN,
          user_email VARCHAR(255) UNIQUE,
          user_birth_month SMALLINT CHECK (user_birth_month BETWEEN 1 AND 12),
          user_birth_day SMALLINT CHECK (user_birth_day BETWEEN 1 AND 31),
          user_birth_year SMALLINT,
          user_phone VARCHAR(20),
          user_image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP