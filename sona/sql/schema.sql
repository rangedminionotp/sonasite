DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Ability CASCADE;
DROP TABLE IF EXISTS AbilityTips CASCADE;
DROP TABLE IF EXISTS SkinItem; 
DROP TABLE IF EXISTS SkinReviews;
DROP TABLE IF EXISTS SkinReviewsReviewed;
DROP TABLE IF EXISTS UserSkinLore;
DROP TABLE IF EXISTS SkinRating;
DROP TABLE IF EXISTS GuidesRoles;
DROP TABLE IF EXISTS GuidesLabels;
DROP TABLE IF EXISTS GuidesCustomLabels;
DROP TABLE IF EXISTS Guides;
-- -- Create Users table
CREATE TABLE Users (id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),data JSONB);

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
    voted INT
);

-- -- Create Skin information table
CREATE TABLE SkinItem (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    data JSONB,
    rating DOUBLE PRECISION
);

-- Create Skin reviews table
CREATE TABLE SkinReviews (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES Users(id),
    skin_id UUID REFERENCES SkinItem(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_name VARCHAR(30) NOT NULL,
    rating DOUBLE PRECISION NOT NULL,  
    data JSONB,
    rating_count INTEGER
);

-- Create SkinReviews reviewed table
CREATE TABLE SkinReviewsReviewed (
    skin_id UUID REFERENCES SkinItem(id) ON DELETE CASCADE ON UPDATE CASCADE,
    owner_id UUID REFERENCES Users(id),
    skin_reviews_id UUID REFERENCES SkinReviews(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE UserSkinLore (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES Users(id),
    skin_id UUID REFERENCES SkinItem(id) ON DELETE CASCADE ON UPDATE CASCADE,
    lore TEXT,
    time TIMESTAMP DEFAULT now()
);

CREATE TABLE SkinRating (
    skin_id UUID PRIMARY KEY REFERENCES SkinItem(id) ON DELETE CASCADE ON UPDATE CASCADE,
    rating DOUBLE PRECISION,
    rating_count INTEGER
);

CREATE TABLE GuidesRoles (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(30) NOT NULL UNIQUE,
    data JSONB
);

CREATE TABLE GuidesLabels (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(30) NOT NULL UNIQUE 
);

CREATE TABLE GuidesCustomLabels (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    label VARCHAR(30) NOT NULL UNIQUE,
    owner_id UUID REFERENCES Users(id)
);


CREATE TABLE Guides (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES Users(id),
    role_id UUID REFERENCES GuidesRoles(id),
    label_id UUID REFERENCES GuidesLabels(id),
    data JSONB
);