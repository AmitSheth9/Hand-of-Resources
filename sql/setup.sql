-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS countries;
DROP TABLE IF EXISTS sports;
DROP TABLE IF EXISTS drinks;

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



CREATE TABLE sports (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sport TEXT NOT NULL,
    players INT NOT NULL
);

INSERT INTO sports (sport, players) VALUES (
    'baseball',
    9
);

CREATE TABLE drinks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    drink TEXT NOT NULL,
    carbonated BOOLEAN NOT NULL
);

INSERT INTO drinks (drink, carbonated) VALUES (
    'coke',
    true
);

