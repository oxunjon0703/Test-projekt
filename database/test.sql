CREATE DATABASE testProjekt;

CREATE SCHEMA test;

CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

CREATE TABLE test.files
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    originalName VARCHAR not null,
    path TEXT DEFAULT NULL,
    size NUMERIC NOT NULL,
    mimetype TEXT DEFAULT NULL,
    date TIMESTAMP
);

INSERT INTO test.files
    (original_name, path, size, mime_type, date)
VALUES
    ('screnshot', 'http://localhost:7777/file/69a5f046-2b18-48d2-952d-ef375884ab4b.png', 48010, 'audio/mp3', '2023-10-10 12:12:12'),
    ('screnshot1', 'http://localhost:5050/file/12d54w34-3e45-48d2-952d-ef375884ab4b.png', 871552, 'audio/mp4', '2023-11-1 12:12:12'),
    ('screnshot2', 'http://localhost:5050/file/12d54w34-3e45-48d2-952d-ef375884ab4b.png', 871552, 'audio/mp4', '2023-11-1 12:12:12');

SELECT *
FROM test.files;


CREATE TYPE role_enum AS ENUM
('user', 'admin');

CREATE TABLE test.users
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    login VARCHAR(50) NOT null,
    password TEXT NOT NULL,
    full_name VARCHAR(100) DEFAULT NULL,
    birthdate TIMESTAMP DEFAULT NULL,
    role role_enum NOT NULL,
    file_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    CONSTRAINT fk_file_id FOREIGN KEY (file_id) REFERENCES test.files(id)
);


INSERT INTO text.users
    (login, password, full_name, birthdate, role, file_id)
VALUES
    ('Oxunjon', '20032003', 'fullName', '2003-11-1 12:12:12', 'admin', 'ed7ee7b4-c615-4464-8936-e2026c6016d9'),
    ('Samandar', '21532153', 'fullName2', '2004-11-5 12:12:12', 'user', '1b104ab4-bb9e-42aa-9c07-bafb14b60da6'),
    ('Doniyor', '20032003', 'fullName3', '2005-11-7 12:12:12', 'user', 'bd7bb829-8912-46ee-ba48-2d3d59a9c552');


SELECT u.id, u.login, u.password, u.full_name, u.birthdate, u.role, row_to_json(f) files
FROM test.users as u inner join test.files as f on u.file_id = f.id;


CREATE TABLE test.questions
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title VARCHAR NOT NULL
);

INSERT INTO test.questions (title)
VALUES('Olma ingliz tilida nima deyiladi');

SELECT * FROM test.questions;


CREATE TABLE test.tests
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title VARCHAR NOT NULL
);

INSERT INTO test.tests (title)
VALUES('Til');

SELECT * FROM test.tests;


CREATE TABLE test.test_questions
(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    test_id INT NOT NULL,
    question_id INT NOT NULL,
    CONSTRAINT fk_test_id FOREIGN KEY (test_id) REFERENCES tests(id),
    CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO test.test_questions (test_id, question_id)
VALUES(1, 1);

SELECT * FROM test.test_questions;