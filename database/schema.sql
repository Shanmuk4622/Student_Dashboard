CREATE TABLE lost_items (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date_lost DATE,
    contact_info VARCHAR(255),
    image_url TEXT,
    status VARCHAR(50) DEFAULT 'lost',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID REFERENCES auth.users(id)
);
