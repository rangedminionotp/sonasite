DELETE FROM Users;
INSERT INTO Users(id, data) VALUES ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04','{"email":"molly@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y","roles":["member"],"name":"Molly Member"}');
INSERT INTO Users(id, data) VALUES ('9c838adb-0cb9-4dda-a1d3-946412aa1183','{"email":"anna@books.com","password":"$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze","roles":["member", "admin"],"name":"Anna Admin"}');
INSERT INTO Users(data) VALUES ('{"email":"nobby@books.com","password":"$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm","roles":[],"name":"Nobby Nobody"}');

DELETE FROM Ability;
INSERT INTO Ability (id, name, data) 
VALUES 
('60028b69-8180-4d66-8331-c42a0426ab5f', 'Q', '{"fullName": "Hymn of Valor"}'),
('223eeef1-8046-49a4-abb8-e6c86eb5d392', 'W', '{"fullName": "Aria of Perseverance"}'),
('8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'E', '{"fullName": "Song of Celerity"}'),
('93007fa7-7ce6-4a55-812c-cb93376b6144', 'R', '{"fullName": "Crescendo"}'),
('27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Passive', '{"fullName": "Power Chord"}');

DELETE FROM AbilityTips; 

INSERT INTO AbilityTips (owner_id, ability_id, owner_name, data, upvotes, downvotes)
VALUES
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Effective for early game harassment", "date": "2023-02-10T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 12, 1),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Molly Member', '{"description": "Effective for early game harassment", "date": "2023-02-10T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 12, 1),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "Provides excellent lane sustain", "date": "2023-02-11T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 18, 4),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'Molly Member', '{"description": "Increases movement speed significantly", "date": "2023-02-12T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 7, 3),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '93007fa7-7ce6-4a55-812c-cb93376b6144', 'Molly Member', '{"description": "Devastating AoE stun ability", "date": "2023-02-13T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 25, 6),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Strong early game poke", "date": "2023-02-14T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 14, 3),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Molly Member', '{"description": "Useful for early game zoning", "date": "2023-02-15T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 11, 3),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "Great for maintaining lane control", "date": "2023-02-16T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 16, 5),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'Molly Member', '{"description": "Boosts allies speed", "date": "2023-02-17T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 9, 2),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '93007fa7-7ce6-4a55-812c-cb93376b6144', 'Molly Member', '{"description": "High impact AoE stun", "date": "2023-02-18T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 22, 7),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Enhances basic attack speed", "date": "2023-02-19T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 13, 4),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Molly Member', '{"description": "Good for early game harassment", "date": "2023-02-20T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 12, 3),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "Effective for lane sustain", "date": "2023-02-21T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 19, 6),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'Molly Member', '{"description": "Significantly boosts movement speed", "date": "2023-02-22T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 7, 4),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '93007fa7-7ce6-4a55-812c-cb93376b6144', 'Molly Member', '{"description": "AoE stun with great impact", "date": "2023-02-23T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 23, 8),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Increases basic attack damage", "date": "2023-02-24T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 14, 5),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Molly Member', '{"description": "Great for early game poke", "date": "2023-02-25T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 13, 4),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "Effective lane sustain", "date": "2023-02-26T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 17, 7),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'Molly Member', '{"description": "Greatly increases movement speed", "date": "2023-02-27T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 6, 5),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Enhanced basic attacks", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 12, 2),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Molly Member', '{"description": "Great for early game poke", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 10, 2),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "Provides sustain in lane", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 15, 3),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'Molly Member', '{"description": "Boosts movement speed", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 8, 1),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '93007fa7-7ce6-4a55-812c-cb93376b6144', 'Molly Member', '{"description": "Powerful AoE stun", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 20, 5),
    ('7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Molly Member', '{"description": "Enhanced basic attacks", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 12, 2),
     ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Highly effective in crowd control scenarios", "date": "2024-03-25T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 15, 3),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Useful for early game aggression", "date": "2024-02-15T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 18, 2),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Provides a shield in tight situations", "date": "2024-04-10T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 14, 4),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Grants extra damage to basic attacks", "date": "2024-05-12T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 20, 5),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Helps in dodging skill shots", "date": "2024-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 13, 3),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Ideal for zoning enemies", "date": "2024-02-20T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 17, 4),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Boosts attack speed significantly", "date": "2024-03-05T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 22, 6),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Reduces incoming damage", "date": "2024-04-18T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 11, 2),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Gives a brief invulnerability period", "date": "2024-05-02T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 19, 3),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Can turn the tide in team fights", "date": "2024-01-18T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 21, 7),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Synergizes well with certain items", "date": "2024-03-14T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 16, 2),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Great for split pushing", "date": "2024-04-27T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 14, 1),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Increases survivability", "date": "2024-02-08T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 20, 4),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "High burst damage potential", "date": "2024-05-09T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 18, 6),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Can disengage from fights easily", "date": "2024-01-25T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 13, 3),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'Anna Admin', '{"description": "Great for early game poke", "date": "2024-03-20T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 17, 2);

INSERT INTO AbilityTips (id, owner_id, ability_id, owner_name, data, upvotes, downvotes)
VALUES
    ('9c838adb-0cb9-4dda-a1d3-946412aa1121', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '60028b69-8180-4d66-8331-c42a0426ab5f', 'Anna Admin', '{"description": "Q mock data 2", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 10, 2),
    ('9c838adb-0cb9-4dda-a1d3-946412aa1112', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'Molly Member', '{"description": "W mock data 2", "date": "2023-01-30T07:27:29.475Z", "version": "14.12.1"}'::jsonb, 15, 3);

DELETE FROM AbilityTipsVotes;
INSERT INTO AbilityTipsVotes(ability_tip_id, owner_id, voted) 
VALUES
    ('9c838adb-0cb9-4dda-a1d3-946412aa1121', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', 0), 
    ('9c838adb-0cb9-4dda-a1d3-946412aa1121', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 1);

DELETE FROM SkinItem;
INSERT INTO SkinItem (id, name, data)
VALUES
    ('ec724962-80b6-48a4-a638-ce7abce59808', 'default', '{"lore": "Sona is Demacia''s foremost virtuoso of the stringed etwahl, speaking only through her graceful chords and vibrant arias. This genteel manner has endeared her to the highborn, though others suspect her spellbinding melodies to actually emanate magic—a Demacian taboo. Silent to outsiders but somehow understood by close companions, Sona plucks her harmonies not only to soothe injured allies, but also to strike down unsuspecting enemies.", "price": "790", "releaseDate": "2010-09-21T07:00:00.000Z", "artist": "Shilin Huang", "threeDURL": "https://modelviewer.lol/model-viewer?id=37000", "voiceActor": "Erin Fitzgerald"}'),
    ('d2d5fe06-6e4c-4a6b-8d0b-7c88dbebc8e1', 'Muse Sona', '{"lore": "Sona is a goddess of inspiration, compelling her worshippers to create profound works of art for all the world to see. Forgotten with the march of time, she has recently enjoyed a resurgence of followers in the form of coffee-addled waiters working on their ''next big screenplay idea.''", "price": "975", "releaseDate": "2010-09-21T07:00:00.000Z", "artist": "Unknown artist", "threeDURL": "https://modelviewer.lol/model-viewer?id=37001", "voiceActor": "Erin Fitzgerald"}'),
    ('2b76f31f-8b5f-4bc2-8d36-ad94b7363e77', 'Pentakill Sona', '{"lore": "Never tell Sona of PENTAKILL that keyboards aren''t metal. Her instrument is filled with living barbed wire and a sonic scream loud enough to bring other, lesser musical genres crashing to their knees.", "price": "975", "releaseDate": "2010-09-21T07:00:00.000Z", "artist": "Pan Chengwei", "threeDURL": "https://modelviewer.lol/model-viewer?id=37002", "voiceActor": "Erin Fitzgerald"}'),
    ('53a82f4f-6867-4920-a522-037ad7b0c53b', 'Silent Night Sona', '{"lore": "Drifting through the streets as she plays, Sona''s beautiful melodies bring out the wonder of fresh snowfalls, quiet evenings by the fire, and time spent with family and friends. She can also weaponize these songs, raining destruction upon those who would spoil the holidays.", "price": "520", "releaseDate": "2010-12-14T08:00:00.000Z", "artist": "Unknown artist", "threeDURL": "https://modelviewer.lol/model-viewer?id=37003", "voiceActor": "Erin Fitzgerald"}'),
    ('d7564774-c5cf-433e-a474-4ca2f5ca52ae', 'Guqin Sona', '{"lore": "", "price": "975", "releaseDate": "2012-01-10T08:00:00.000Z", "artist": "Unknown artist", "threeDURL": "https://modelviewer.lol/model-viewer?id=37004", "voiceActor": "Erin Fitzgerald"}'),
    ('e673d8bc-f48e-427d-b91a-c2ba1f2dc7db', 'Arcade Sona', '{"lore": "Being forcefully transported from the real world to fight an army of evil video game bosses is no sweat for Sona. She was the first person to beat Keyboard Solo 4''s ultra solo mode on nightmare difficulty—a feat that, by the developers'' own admission, should not have been possible.", "price": "1350", "releaseDate": "2012-08-31T07:00:00.000Z", "artist": "Katie ''TeaTime'' De Sousa", "threeDURL": "https://modelviewer.lol/model-viewer?id=37005", "voiceActor": "Erin Fitzgerald"}'),
    ('4fdcc2f3-2e8d-47dd-9cd2-fb997938281c', 'DJ Sona', '{"lore": "", "price": "3250", "releaseDate": "2015-02-25T08:00:00.000Z", "artist": "Michelle Hoefener", "threeDURL": "https://modelviewer.lol/model-viewer?id=37006", "voiceActor": "Erin Fitzgerald"}'),
    ('181ed2b2-f169-4d25-9a82-e3beda1a2025', 'Sweetheart Sona', '{"lore": "Sona''s quiet elegance and mastery of enchanted music might make the heart go all aflutter, but don''t be fooled—she can still cut a man in half at thirty paces with her harp''s soundwaves. That''s the duality of love: sometimes you win, sometimes you get cut in half by soundwaves.", "price": "975", "releaseDate": "2016-02-11T08:00:00.000Z", "artist": "Yan Li", "threeDURL": "https://modelviewer.lol/model-viewer?id=37007", "voiceActor": "Erin Fitzgerald"}'),
    ('812487b4-1068-4e43-b732-4c7897f3a292', 'Odyssey Sona', '{"lore": "Once member of the Templar Order, Sona was born with the ability to commune directly with ora, and the creatures from which it is harvested. More recently, she has sought out Yasuo, troubled captain of the Morning Star, and joined his ragtag crew—hoping to avert a disaster that could destroy the entire galaxy.", "price": "1350", "releaseDate": "2018-09-12T07:00:00.000Z", "artist": "Kelly Aleshire", "threeDURL": "https://modelviewer.lol/model-viewer?id=37009", "voiceActor": "Erin Fitzgerald"}'),
    ('e5a5177b-156b-44cd-bc6c-a518c0d106e0', 'PsyOps Sona', '{"lore": "An immensely powerful psychic, Sona has spent the past several years locked in darkness, subjected to harrowing experiments to further the Black Rose Group''s aims of manufacturing the perfect human bioweapon. Freeing herself during the assault on the BRG''s research facility, she discovers her power has grown to near-omnipotence, making her less a human than a psychic god.", "price": "1820", "releaseDate": "2020-09-03T07:00:00.000Z", "artist": "Esben Lash Rasmussen", "threeDURL": "https://modelviewer.lol/model-viewer?id=37017", "voiceActor": "Erin Fitzgerald"}'),
    ('588737b6-3d26-4545-80a8-7a16965edeaf', 'Pentakill III: Lost Chapter Sona', '{"lore": "All hail, Sona, the Silent Virtuoso! An artist''s soul can change the world, and with the harmonious power of creation at her fingertips, she will prove that what is made can yet be unmade.", "price": "1350", "releaseDate": "2021-09-09T07:00:00.000Z", "artist": "David Villegas, West Studio", "threeDURL": "https://modelviewer.lol/model-viewer?id=37026", "voiceActor": "Erin Fitzgerald"}'),
    ('f883705f-20ff-40e5-af92-0d15b1272472', 'Star Guardian Sona', '{"lore": "Quiet and reflective, Sona spends her time away from the Guardians as a composer of music... and her time with them as a fighter of incredible power, blasting enemies away with sonically charged starlight. Though she cannot speak, she always makes her voice heard through deeds... or her chatterbox familiar-slash-interpreter, Chiizu.", "price": "1350", "releaseDate": "2022-07-14T07:00:00.000Z", "artist": "Zhong Yang, West Studio", "threeDURL": "https://modelviewer.lol/model-viewer?id=37035", "voiceActor": "Erin Fitzgerald"}'),
    ('5715006a-625d-4efd-9852-b6bdb58d5ed6', 'Immortal Journey Sona', '{"lore": "As a newly immortal member of the Radiant Passion School, Sona''s power is in building harmony from dissonance. To her, immortality only comes through finding your shared harmony with your fellow people, and she sees her students as strong notes to be built into immortal chords. It is in this shared passion that makes anything possible.", "price": "1350", "releaseDate": "2023-08-16T07:00:00.000Z", "artist": "Ina Wong, West Studio", "threeDURL": "https://modelviewer.lol/model-viewer?id=37045", "voiceActor": "Erin Fitzgerald"}'),
    ('d7c43d66-655d-4d9c-a241-a17fa13e3b15', 'Prestige Immortal Journey Sona', '{"lore": "A virtuoso artist radiating passion in whatever she does, Sona paused her promising music career to enroll in fashion school. Now a graduate, the Gala is the first showing of her debut line, and Sona is more than happy to let her work do the talking. Unlike her classmates, she has no dreams of becoming immortal through her designs. The journey is enough.", "price": "Special", "releaseDate": "2023-08-16T07:00:00.000Z", "artist": "Francis Tneh, West Studio", "threeDURL": "https://modelviewer.lol/model-viewer?id=37046", "voiceActor": "Erin Fitzgerald"}');
    
INSERT INTO SkinReviews (id, owner_id, skin_id, owner_name, rating, data)
VALUES
    ('d8e9e675-65b9-4869-8e90-4cb9fefd20e8', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'ec724962-80b6-48a4-a638-ce7abce59808', 'Anna Admin', 4, '{"description": "Great skin with vibrant colors", "date": "2024-01-15T10:15:30.000Z"}'),
    ('25b569e7-6b84-4263-aeaa-3722374801da', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'd2d5fe06-6e4c-4a6b-8d0b-7c88dbebc8e1', 'Anna Admin', 5, '{"description": "Excellent detail and texture", "date": "2024-02-10T14:30:45.000Z"}'),
    ('72973c69-d8b3-4919-8bc0-9b9527b6ee96', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '2b76f31f-8b5f-4bc2-8d36-ad94b7363e77', 'Anna Admin', 3, '{"description": "Decent but could be better", "date": "2024-03-05T18:45:00.000Z"}'),
    ('1bb48bbe-5bb3-48e0-aee0-a6f2a6c6cdcf', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '53a82f4f-6867-4920-a522-037ad7b0c53b', 'Anna Admin', 4, '{"description": "Nice skin with good usability", "date": "2024-03-20T07:27:29.475Z"}'),
    ('d0ff42a5-922d-45cc-83f1-070b0a0f7292', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'd7564774-c5cf-433e-a474-4ca2f5ca52ae', 'Anna Admin', 5, '{"description": "Perfect skin for my needs", "date": "2024-04-10T09:00:15.000Z"}'),
    ('0f125415-ce90-427c-b420-7a7e527600a8', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'e673d8bc-f48e-427d-b91a-c2ba1f2dc7db', 'Anna Admin', 3, '{"description": "Average quality", "date": "2024-05-01T13:15:00.000Z"}'),
    ('d10768e0-8ced-4612-af7c-b377ea4651f5', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '4fdcc2f3-2e8d-47dd-9cd2-fb997938281c', 'Anna Admin', 4, '{"description": "Good performance and look", "date": "2024-06-15T16:30:45.000Z"}'),
    ('5335ecc2-3506-40c6-bc70-1b45c08be225', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '181ed2b2-f169-4d25-9a82-e3beda1a2025', 'Anna Admin', 5, '{"description": "Fantastic design!", "date": "2024-07-20T11:45:30.000Z"}'),
    ('5d27a046-c261-494a-ad17-7ee1d6e1aaef', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '812487b4-1068-4e43-b732-4c7897f3a292', 'Anna Admin', 4, '{"description": "Very nice and user-friendly", "date": "2024-08-05T08:00:15.000Z"}'),
    ('472ca6e9-b885-43ca-933d-b68dee7709a6', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'e5a5177b-156b-44cd-bc6c-a518c0d106e0', 'Anna Admin', 3, '{"description": "Satisfactory but has issues", "date": "2024-09-10T12:30:00.000Z"}'),
    ('fbe731e3-71f4-4b6e-868b-68f25508b71f', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '588737b6-3d26-4545-80a8-7a16965edeaf', 'Anna Admin', 4, '{"description": "Looks great!", "date": "2024-10-01T14:45:45.000Z"}'),
    ('fbd33c65-7e25-4006-8f5b-61b71560f127', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'f883705f-20ff-40e5-af92-0d15b1272472', 'Anna Admin', 5, '{"description": "Excellent!", "date": "2024-11-15T17:00:30.000Z"}'),
    ('52bcd2ec-31fa-4d87-85fd-bdf6e4296fe4', '9c838adb-0cb9-4dda-a1d3-946412aa1183', '5715006a-625d-4efd-9852-b6bdb58d5ed6', 'Anna Admin', 3, '{"description": "Good but has room for improvement", "date": "2024-12-20T19:15:15.000Z"}'),
    ('25794837-03de-4e65-808c-3c6580141a6e', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'd7c43d66-655d-4d9c-a241-a17fa13e3b15', 'Anna Admin', 5, '{"description": "Perfect in every way", "date": "2025-01-05T21:30:00.000Z"}');

INSERT INTO SkinReviews (id, owner_id, skin_id, owner_name, rating, data)
VALUES
    ('373e7a8c-2f73-4850-9da2-b66723c76759', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', 'ec724962-80b6-48a4-a638-ce7abce59808', 'Molly Member', 5, '{"description": "Outstanding skin", "date": "2024-02-15T10:30:00.000Z"}'),
    ('a523d523-ffb5-4f71-89a1-25d1bfbf4286', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '2b76f31f-8b5f-4bc2-8d36-ad94b7363e77', 'Molly Member', 3, '{"description": "Not bad, could be better", "date": "2024-03-25T12:00:15.000Z"}'),
    ('264767ad-61e0-4fa2-bb4a-0d798bdcf82d', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', 'd7564774-c5cf-433e-a474-4ca2f5ca52ae', 'Molly Member', 4, '{"description": "Good quality", "date": "2024-04-30T14:45:30.000Z"}'),
    ('a887b57f-0cab-455a-967f-3ee4619b3875', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '4fdcc2f3-2e8d-47dd-9cd2-fb997938281c', 'Molly Member', 3, '{"description": "Average performance", "date": "2024-05-20T16:00:45.000Z"}'),
    ('ef2c0fd0-9b10-4683-8e94-288ba0f1efe1', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '812487b4-1068-4e43-b732-4c7897f3a292', 'Molly Member', 5, '{"description": "Exceptional skin!", "date": "2024-06-25T18:15:00.000Z"}'),
    ('e48a9976-368f-43f6-b652-a899d1e36a0f', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '588737b6-3d26-4545-80a8-7a16965edeaf', 'Molly Member', 4, '{"description": "Very good and reliable", "date": "2024-07-15T20:30:15.000Z"}'),
    ('37c771f6-d927-40cb-a119-c5eec0ee9a51', '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '5715006a-625d-4efd-9852-b6bdb58d5ed6', 'Molly Member', 4, '{"description": "Solid choice", "date": "2024-08-10T22:45:30.000Z"}');
DELETE FROM SkinReviewsReviewed; 

-- First, we need to retrieve the distinct skin_id and owner_id pairs from the SkinReviews table.
WITH ReviewPairs AS (
    SELECT DISTINCT skin_id, owner_id, id
    FROM SkinReviews
)

-- Now, we insert these pairs into the SkinReviewsReviewed table.
INSERT INTO SkinReviewsReviewed (skin_id, owner_id, skin_reviews_id)
SELECT skin_id, owner_id, id
FROM ReviewPairs;


DELETE FROM UserSkinLore;
INSERT INTO UserSkinLore (owner_id, skin_id, lore)
VALUES
    ('9c838adb-0cb9-4dda-a1d3-946412aa1183', 'd7564774-c5cf-433e-a474-4ca2f5ca52ae', '风是乌发弄心弦，花是零落化暗香，雪是天籁映丹蔻，月是良夜伴君侧。');

INSERT INTO UserSkinLore (id, owner_id, skin_id, lore)
VALUES
    ('680fdcb9-e2e5-4863-a350-d08ccff74afe', '9c838adb-0cb9-4dda-a1d3-946412aa1183', 'd7564774-c5cf-433e-a474-4ca2f5ca52ae', '老婆给我cosplay谈个琴呗lol');

DELETE FROM SkinRating;
INSERT INTO SkinRating (skin_id, rating, rating_count)
VALUES
    ('ec724962-80b6-48a4-a638-ce7abce59808', 0, 0),
    ('d2d5fe06-6e4c-4a6b-8d0b-7c88dbebc8e1', 0, 0),
    ('2b76f31f-8b5f-4bc2-8d36-ad94b7363e77', 0, 0),
    ('53a82f4f-6867-4920-a522-037ad7b0c53b', 0, 0),
    ('d7564774-c5cf-433e-a474-4ca2f5ca52ae', 0, 0),
    ('e673d8bc-f48e-427d-b91a-c2ba1f2dc7db', 0, 0),
    ('4fdcc2f3-2e8d-47dd-9cd2-fb997938281c', 0, 0),
    ('181ed2b2-f169-4d25-9a82-e3beda1a2025', 0, 0),
    ('812487b4-1068-4e43-b732-4c7897f3a292', 0, 0),
    ('e5a5177b-156b-44cd-bc6c-a518c0d106e0', 0, 0),
    ('588737b6-3d26-4545-80a8-7a16965edeaf', 0, 0),
    ('f883705f-20ff-40e5-af92-0d15b1272472', 0, 0),
    ('5715006a-625d-4efd-9852-b6bdb58d5ed6', 0, 0),
    ('d7c43d66-655d-4d9c-a241-a17fa13e3b15', 0, 0);

DELETE FROM GuidesRoles;
INSERT INTO GuidesRoles (id, role, data)
VALUES
    ('63031fde-77bb-422b-b1cc-df8c08dd6a80', 'TOP', '{"imgurl": "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png"}'),
    ('e24749f8-11b7-4653-94d2-6933f6ec68b5', 'JUNGLE', '{"imgurl":"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png"}'),
    ('cb6b3ee1-508f-42c1-a7da-a2a842d3a71d', 'MID', '{"imgurl":"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png"}'),
    ('feaa748d-d6ce-464a-b11c-3a8fb6c172a3', 'bottom', '{"imgurl":"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png"}'),
    ('54c2ab79-c20a-4921-b246-a05248564bae', 'SUPPORT', '{"imgurl":"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png"}'),
    ('86eb060d-80db-4bce-a2fa-9b7958f3c422', 'aram', '{"imgurl":"https://static.wikia.nocookie.net/leagueoflegends/images/0/02/Howling_Abyss_icon.png/revision/latest/scale-to-width-down/40?cb=20171101151627"}'),
    ('e5ad1df8-a147-4b9a-a59f-dc0a28d85cb9', 'river', '{"imgurl":"https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-unselected.png"}');

DELETE FROM GuidesLabels;
INSERT INTO GuidesLabels(label) VALUES 
('SUPPORT MOMMY QUEEN'),
('1V9 AP RIVEN SONA');