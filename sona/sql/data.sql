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

INSERT INTO AbilityTips (id, owner_id, ability_id, owner_name, data)
VALUES
    (gen_random_uuid(), '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '60028b69-8180-4d66-8331-c42a0426ab5f', 'User1', '{"description": "Great for early game poke", "date": "2023-01-30T07:27:29.475Z"}'::jsonb),
    (gen_random_uuid(), '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '223eeef1-8046-49a4-abb8-e6c86eb5d392', 'User1', '{"description": "Provides sustain in lane", "date": "2023-01-30T07:27:29.475Z"}'::jsonb),
    (gen_random_uuid(), '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '8a29baf7-e2dc-47c0-ace4-1c5844ff8a71', 'User2', '{"description": "Boosts movement speed", "date": "2023-01-30T07:27:29.475Z"}'::jsonb),
    (gen_random_uuid(), '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '93007fa7-7ce6-4a55-812c-cb93376b6144', 'User2', '{"description": "Powerful AoE stun", "date": "2023-01-30T07:27:29.475Z"}'::jsonb),
    (gen_random_uuid(), '7b8b1684-ce6c-4c4d-bb84-fa518bac7e04', '27ce1177-a9c5-44e6-b450-bd1c3c4c54a9', 'User1', '{"description": "Enhanced basic attacks", "date": "2023-01-30T07:27:29.475Z"}'::jsonb);