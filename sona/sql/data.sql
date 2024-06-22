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
 