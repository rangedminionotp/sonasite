-- Drop existing tables if they exist
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Ability CASCADE;
DROP TABLE IF EXISTS AbilityTips CASCADE;

-- Create Users table
CREATE TABLE Users (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    data JSONB
);

-- Create Ability table
CREATE TABLE Ability (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(30) NOT NULL UNIQUE, -- Ensures ability names are unique
    data JSONB
);

-- Create AbilityTips table
CREATE TABLE AbilityTips (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    ability_id UUID REFERENCES Ability(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_name VARCHAR(30) NOT NULL,
    data JSONB
);
-- Add popularity columns
ALTER TABLE AbilityTips
ADD COLUMN upvotes INTEGER DEFAULT 0,
ADD COLUMN downvotes INTEGER DEFAULT 0;

-- Create AbilityTipsVotes table
CREATE TABLE AbilityTipsVotes (
    ability_tip_id UUID REFERENCES AbilityTips(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_id UUID REFERENCES Users(id) ON DELETE CASCADE ON UPDATE CASCADE, 
    voted INT DEFAULT 0
);