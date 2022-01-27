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

DROP TABLE IF EXISTS countries;

CREATE TABLE countries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    country TEXT NOT NULL,
    landmass DEC NOT NULL
);
INSERT INTO countries (country, landmass) 
VALUES (
    'United States',
    3.797
);