-- Enable RLS
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
-- Allow anyone to select (public read)
CREATE POLICY "public_select" ON images FOR
SELECT USING (TRUE);
-- Allow anyone to insert (for uploads)
CREATE POLICY "public_insert" ON images FOR
INSERT WITH CHECK (TRUE);
-- Optional: allow anyone to update/delete if you want full public control
CREATE POLICY "public_update" ON images FOR
UPDATE USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "public_delete" ON images FOR DELETE USING (TRUE);
-- Note: Supabase storage tables are managed internally
-- Usually you allow public read by making the bucket public
-- Uploads can still be done via service_role key in backend