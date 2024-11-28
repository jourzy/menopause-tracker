DROP DATABASE db_pause;

CREATE DATABASE db_pause;



USE db_pause;

-- Taking the minimum amount of data from the user as possible
CREATE TABLE tbl_users
(user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
f_name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
_password VARCHAR(50) NOT NULL,
date_joined TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO
tbl_users
(f_name, email, _password)
VALUES
('Mary', 'mary@yahoo.com', '12345'),
('Emma', 'emma@hotmail.com', 'password'),
('Lingsay', 'lingsay@gmail.co.uk', 'anime'),
('Katie', 'katie@hotmail.co.uk', 'football');

CREATE TABLE tbl_symptoms
(symptom_id CHAR(2) PRIMARY KEY,
symptom_description VARCHAR(100) NOT NULL,
_order INTEGER);

-- DROP TABLE tbl_symptoms;

CREATE TABLE tbl_user_symptoms
(user_symptom_id INTEGER PRIMARY KEY AUTO_INCREMENT,
user_id INTEGER NOT NULL,
_date DATE NOT NULL,
symptom_id CHAR(2) NOT NULL,
CONSTRAINT fk_user_symptoms FOREIGN KEY (user_id)
REFERENCES tbl_users(user_id),
CONSTRAINT fk_symptom FOREIGN KEY (symptom_id)
REFERENCES tbl_symptoms(symptom_id),
-- no duplicates of these three together allowed
CONSTRAINT uc_user_symptoms UNIQUE (user_id, _date, symptom_id));

-- DROP TABLE tbl_user_symptoms;

INSERT INTO
tbl_symptoms
(symptom_id, symptom_description, _order)
VALUES
('NS', 'No symptoms', 1),
('HF', 'Hot flushes/ night sweats', 2),
('BT', 'Breast tenderness', 3),
('MO', 'Low mood', 4),
('SL', 'Problems with sleeping', 5),
('HE', 'Headaches', 6),
('JP', 'Joint/ muscle pain', 7),
('VA', 'Vaginal atrophy (dryness/inflammation)', 8),
('CO', 'Cognitive (Brain fog/ Processing/ Memory)', 9),
('BL','Bloating', 10),
('FA', 'Fatigue', 11);

-- to fix an incorrect spelling in the symptoms table
-- UPDATE tbl_symptoms
-- SET symptom_description = "Vaginal atrophy (dryness/inflammation)"
-- WHERE symptom_id = "VA";


INSERT INTO 
tbl_user_symptoms
(user_id, _date, symptom_id)
VALUES
(1, "2024-05-01", "JP"),
(1, "2024-05-01", "MO"),
(1, "2024-05-01", "HF"),
(1, "2024-05-02", "BL"),
(1, "2024-05-03", "BL"),
(1, "2024-05-04", "SL"),
(1, "2024-05-05", "JP"),
(1, "2024-05-05", "CO"),
(1, "2024-05-06", "NS"),
(1, "2024-05-07", "FA"),
(1, "2024-05-07", "MO"),
(1, "2024-05-07", "JP"),
(2, "2024-05-01", "JP"),
(2, "2024-05-01", "MO"),
(2, "2024-05-01", "HF"),
(2, "2024-05-02", "NS"),
(2, "2024-05-03", "BL"),
(2, "2024-05-04", "SL"),
(2, "2024-05-05", "JP"),
(2, "2024-05-05", "CO"),
(2, "2024-05-06", "NS"),
(2, "2024-05-07", "FA"),
(2, "2024-05-07", "MO"),
(2, "2024-05-07", "CO");


-- API ENDPOINT QUERIES

-- select statement for '/symptoms' endpoint
SELECT symptom_id, symptom_description FROM tbl_symptoms ORDER BY _order;

-- select statement for '/user/symptoms' endpoint
SELECT user_id, _date, symptom_id FROM tbl_user_symptoms WHERE user_id = 2;

-- Adding a new record to user_symptoms table
INSERT INTO tbl_user_symptoms (user_id, _date, symptom_id) VALUES (3, "2024-05-01", "CO");

-- Update a record in the user_symptoms table
-- UPDATE tbl_user_symptoms SET column1 = value1, column2 = value2, ...
-- WHERE condition;

-- Delete a record in the user_symptoms table
DELETE FROM tbl_user_symptoms WHERE user_id = 3 AND _date = '2024-05-01';

-- improved select statement to return the symptom description using join
SELECT s.symptom_description FROM tbl_symptoms AS s
INNER JOIN tbl_user_symptoms AS u
ON s.symptom_id=u.symptom_id
WHERE user_id = 2 AND _date = '2024-06-04';




-- UNUSED CODE

-- SELECT * FROM tbl_tracker WHERE NS = 1;
-- DROP TABLE tbl_symptoms;

-- CREATE TABLE tbl_symptom_categories
-- (category_id CHAR(1) PRIMARY KEY,
-- category_description VARCHAR(50) NOT NULL);

-- INSERT INTO
-- tbl_symptom_categories
-- (category_id, category_description)
-- VALUES
-- ('N', 'No symptoms'),
-- ('P', 'Physical symptoms'),
-- ('M', 'Mood symptoms'),
-- ('S', 'Sleep symptoms'),
-- ('C', 'Cognitive symptoms');

-- CONDENSED AS FELT THERE WERE TOO MANY SYMPTOMS AND DATA INPUT WOULD TAKE MUCH LONGER
-- ('MS', 'Mood swings', 'M'),
-- ('AN', 'Anxiety', 'M'),
-- ('DE', 'Feeling depressed', 'M'),
-- ('IR', 'Feeling irritable', 'M'),
-- ('FA', 'Difficulty falling asleep', 'S'),
-- ('SA', 'Difficulty staying asleep', 'S'),
-- ('WE', 'Waking up too early', 'S'),
-- ('NS', 'Night sweats', 'S'),
-- ('BF', 'Brain fog', 'C'),
-- ('IP', 'Slower information processing', 'C'),
-- ('DC', 'Difficulty concentrating', 'C'),
-- ('MP', 'Memory problems', 'C');

-- Removed as symptoms are experienced over time
-- Weight gain
-- Thinning hair or hair loss




