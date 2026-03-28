CREATE DATABASE IF NOT EXISTS chennai_profiles;
USE chennai_profiles;

CREATE TABLE IF NOT EXISTS registrations (
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- Personal Details
    name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    dob DATE NOT NULL,
    birth_hour VARCHAR(5),
    birth_min VARCHAR(5),
    birth_ampm VARCHAR(5),
    place_birth VARCHAR(255) NOT NULL,
    nativity VARCHAR(255) NOT NULL,
    mother_tongue VARCHAR(100) NOT NULL,
    marital_status VARCHAR(50),

    -- Family Details
    father_name VARCHAR(255),
    father_alive VARCHAR(10),
    father_job VARCHAR(255),
    mother_name VARCHAR(255),
    mother_alive VARCHAR(10),
    mother_job VARCHAR(255),
    sib_married_eb VARCHAR(5),
    sib_married_yb VARCHAR(5),
    sib_married_es VARCHAR(5),
    sib_married_ys VARCHAR(5),
    sib_unmarried_eb VARCHAR(5),
    sib_unmarried_yb VARCHAR(5),
    sib_unmarried_es VARCHAR(5),
    sib_unmarried_ys VARCHAR(5),
    others TEXT,

    -- Physical Attributes
    height VARCHAR(20),
    weight VARCHAR(20),
    blood_group VARCHAR(10),
    diet VARCHAR(50),
    disability VARCHAR(10),
    complexion VARCHAR(50),

    -- Education & Occupation
    qualification VARCHAR(255),
    job VARCHAR(255),
    place_job VARCHAR(255),
    income_month VARCHAR(100),

    -- Partner Expectation
    partner_qualification VARCHAR(255),
    partner_job VARCHAR(255),
    partner_job_requirement VARCHAR(50),
    partner_income_month VARCHAR(100),
    partner_age_from VARCHAR(10),
    partner_age_to VARCHAR(10),
    partner_diet VARCHAR(50),
    partner_horoscope_required VARCHAR(10),
    partner_marital_status VARCHAR(50),
    partner_caste VARCHAR(100),
    partner_sub_caste VARCHAR(100),
    partner_other_requirement TEXT,

    -- Astrology
    caste VARCHAR(100),
    sub_caste VARCHAR(100),
    gothram VARCHAR(100),
    star VARCHAR(100),
    raasi VARCHAR(100),
    padam VARCHAR(100),
    laknam VARCHAR(100),

    -- Communication Details
    permanent_address TEXT,
    present_address TEXT,
    contact_person VARCHAR(255),
    contact_number VARCHAR(15) NOT NULL,

    -- Photos
    photo1 VARCHAR(500),
    photo2 VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
