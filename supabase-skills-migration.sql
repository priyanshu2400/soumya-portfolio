-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('core', 'tool')),
  "order" INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON skills
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Allow authenticated insert" ON skills
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update" ON skills
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete
CREATE POLICY "Allow authenticated delete" ON skills
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for ordering
CREATE INDEX IF NOT EXISTS idx_skills_category_order ON skills(category, "order");

-- Insert default skills
INSERT INTO skills (name, category, "order") VALUES
  ('Fashion Styling', 'core', 1),
  ('Brand Identity', 'core', 2),
  ('Content Creation', 'core', 3),
  ('UI/UX Design', 'core', 4),
  ('Graphic Design', 'core', 5),
  ('3D Design', 'core', 6),
  ('Event Curation', 'core', 7),
  ('Social Media', 'core', 8),
  ('Photoshop', 'tool', 1),
  ('Illustrator', 'tool', 2),
  ('Figma', 'tool', 3),
  ('Blender', 'tool', 4),
  ('Canva Pro', 'tool', 5),
  ('Midjourney', 'tool', 6);
