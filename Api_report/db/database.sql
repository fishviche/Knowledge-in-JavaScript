CREATE TABLE IF NOT EXISTS country (
    country_id SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS "state" (
    state_id SERIAL PRIMARY KEY,
    country_id INT NOT NULL,
    "name" VARCHAR NOT NULL,
    CONSTRAINT fk_country_id FOREIGN KEY (country_id) REFERENCES country(country_id)
);
CREATE TABLE IF NOT EXISTS province (
    province_id SERIAL PRIMARY KEY,
    state_id INT NOT NULL,
    "name" VARCHAR NOT NULL,
    CONSTRAINT fk_state_id FOREIGN KEY (state_id) REFERENCES "state"(state_id)
);
CREATE TABLE IF NOT EXISTS district (
    district_id SERIAL PRIMARY KEY,
    province_id INT NOT NULL,
    "name" VARCHAR NOT NULL,
    buildings JSONB NOT NULL,
    poblation JSONB NOT NULL,
    CONSTRAINT fk_province_id FOREIGN KEY (province_id) REFERENCES "province"(province_id)
);
CREATE TABLE IF NOT EXISTS reporter (
    reporter_id SERIAL PRIMARY KEY,
    district_id INT NOT NULL,
    created_at timestamp without time zone  NOT NULL DEFAULT NOW(),
    name VARCHAR NOT NULL,
    age INT NOT NULL,
    document_number VARCHAR NOT NULL UNIQUE,
    CONSTRAINT fk_district_id FOREIGN KEY (district_id) REFERENCES district(district_id)
);
CREATE TABLE IF NOT EXISTS category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
CREATE TABLE IF NOT EXISTS subcategory (
    subcategory_id SERIAL PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR NOT NULL,
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(category_id)
);
CREATE TABLE IF NOT EXISTS report (
    report_id SERIAL PRIMARY KEY,
    reporter_id INT NOT NULL,
    category_id INT NOT NULL,
    district_id INT NOT NULL,
    geolocation JSONB NOT NULL,
    params JSONB NOT NULL,
    score INT,
    reported_in timestamp without time zone  NOT NULL DEFAULT NOW(),
    CONSTRAINT valid_score CHECK (score <= 10 AND score > 0),
    CONSTRAINT fk_reporter_id FOREIGN KEY (reporter_id) REFERENCES reporter(reporter_id),
    CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES category(category_id),
    CONSTRAINT fk_district_id FOREIGN KEY (district_id) REFERENCES district(district_id)
);
INSERT INTO category(name) VALUES ('Limpieza'), ('Delicuencia');
CREATE INDEX report_index ON REPORT(report_id, reported_in, reporter_id, category_id, district_id);