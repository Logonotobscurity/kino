-- Alter profiles table to add the fields needed for enhanced user profiles

-- Add bio field
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;

-- Add membership fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_tier TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_expiry TIMESTAMP WITH TIME ZONE;

-- Add community fields
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_joined BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_join_date TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_level TEXT DEFAULT 'newcomer';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS community_badges JSONB DEFAULT '[]'::JSONB;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS profiles_membership_tier_idx ON profiles(membership_tier);
CREATE INDEX IF NOT EXISTS profiles_community_level_idx ON profiles(community_level);

-- Update RLS policies for the new fields
ALTER TABLE profiles
  DROP POLICY IF EXISTS "Users can update their own profiles";

CREATE POLICY "Users can update their own profiles"
  ON profiles
  FOR UPDATE USING (auth.uid() = id);

COMMENT ON TABLE profiles IS 'User profile information including membership and community details'; 