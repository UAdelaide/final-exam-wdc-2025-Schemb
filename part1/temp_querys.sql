-- Write SQL INSERT INTO statements to add the following information. Be sure to:

-- Use subqueries to reference related data where it already exists in another table. For example, the owner_id is automatically created as the id in the users table.  When adding the owner_id for a dog, do not hard code the owner_id, but rather look it up first in the users table using the username to find it.
-- If you are unsure how to apply subqueries in this context, hard code the ids in for partial marks and to populate the database for use.
-- Data to be inserted:

-- Five users:
-- A user with the username alice123, email alice@example.com, password hash hashed123, and role owner.
-- A user with the username bobwalker, email bob@example.com, password hash hashed456, and role walker.
-- A user with the username carol123, email carol@example.com, password hash hashed789, and role owner.
-- Two more users with details of your choosing.
-- Five dogs:
-- A dog named Max, who is medium-sized and owned by alice123.
-- A dog named Bella, who is small and owned by carol123.
-- Three more dogs with details of your choosing.
-- Five walk requests:
-- A request for Max at 2025-06-10 08:00:00 for 30 minutes at Parklands, with status open.
-- A request for Bella at 2025-06-10 09:30:00 for 45 minutes at Beachside Ave, with status accepted.
-- Three more walk requests with details of your choosing.
-- ** You do not need to hash the password, just literally use the ones given and pretend they are already hashed. E.g. in password hash, ‘hashed123’ should be placed.

-- Users Insert Into
INSERT INTO `Users` (`username`, `email`, `password_hash`, `role`)
VALUES ('alice123', 'alice@example.com', 'hashed123', 'owner');

INSERT INTO `Users` (`username`, `email`, `password_hash`, `role`)
VALUES ('bobwalker', 'bob@example.com', 'hashed456', 'walker');

INSERT INTO `Users` (`username`, `email`, `password_hash`, `role`)
VALUES ('carol123', 'carol@example.com', 'hashed789', 'owner');

INSERT INTO `Users` (`username`, `email`, `password_hash`, `role`)
VALUES ('deanweb', 'dean@example.com', 'password123', 'walker');

INSERT INTO `Users` (`username`, `email`, `password_hash`, `role`)
VALUES ('josephs', 'joseph@example.com', 'password456', 'owner');

-- Dogs Insert Into
INSERT INTO `Dogs` (`owner_id`, `name`, `size`)
SELECT `user_id`, 'Max', 'medium' FROM `Users` WHERE `username` = 'alice123' AND `role` = 'owner' LIMIT 1;

INSERT INTO `Dogs` (`owner_id`, `name`, `size`)
SELECT `user_id`, 'Bella', 'small' FROM `Users` WHERE `username` = 'carol123' AND `role` = 'owner' LIMIT 1;

INSERT INTO `Dogs` (`owner_id`, `name`, `size`)
SELECT `user_id`, 'Luna', 'medium' FROM `Users` WHERE `username` = 'josephs' AND `role` = 'owner' LIMIT 1;

INSERT INTO `Dogs` (`owner_id`, `name`, `size`)
SELECT `user_id`, 'Clifford', 'large' FROM `Users` WHERE `username` = 'alice123' AND `role` = 'owner' LIMIT 1;

INSERT INTO `Dogs` (`owner_id`, `name`, `size`)
SELECT `user_id`, 'Pipsqueak', 'small' FROM `Users` WHERE `username` = 'carol123' AND `role` = 'owner' LIMIT 1;

-- WalkRequests Insert Into
INSERT INTO `WalkRequests` (`dog_id`, `requested_time`, `duration_minutes`, `location`, `status`)
SELECT `dog_id`, '2025-06-10 08:00:00', 30, 'Parklands', 'open' FROM `Dogs` WHERE `name` = 'Max' LIMIT 1;

INSERT INTO `WalkRequests` (`dog_id`, `requested_time`, `duration_minutes`, `location`, `status`)
SELECT `dog_id`, '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted' FROM `Dogs` WHERE `name` = 'Bella' LIMIT 1;

INSERT INTO `WalkRequests` (`dog_id`, `requested_time`, `duration_minutes`, `location`, `status`)
SELECT `dog_id`, '2025-06-21 16:30:00', 60, 'North Terrace', 'accepted' FROM `Dogs` WHERE `name` = 'Luna' LIMIT 1;

INSERT INTO `WalkRequests` (`dog_id`, `requested_time`, `duration_minutes`, `location`, `status`)
SELECT `dog_id`, '1963-10-03 6:15:00', 10, 'Birdwell Island', 'completed' FROM `Dogs` WHERE `name` = 'Clifford' LIMIT 1;