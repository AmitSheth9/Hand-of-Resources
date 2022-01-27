-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    make TEXT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO cars (make, color) 
VALUES (
    'Volvo',
    'Silver'
);