-- Create the images table
CREATE TABLE IF NOT EXISTS images (
    id uuid PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    filename TEXT NOT NULL,
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    public_url TEXT NOT NULL,
    dimensions JSONB,
    is_compressed BOOLEAN DEFAULT FALSE,
    delete_date TIMESTAMPTZ
);
-- Supabase storage buckets are created via API/UI, but using SQL you can set policies after creation
-- Bucket name: images
-- Public access (anyone can read)
-- Allowed MIME Types: image/jpeg, image/png, image/webp, image/avif, image/gif