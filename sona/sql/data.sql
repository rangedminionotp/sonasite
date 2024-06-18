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