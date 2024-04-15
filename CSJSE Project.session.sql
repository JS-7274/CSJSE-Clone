# disable foreign key checks so you can do what you want
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS School_Profile;
CREATE TABLE School_Profile (
    school_id varchar(36) PRIMARY KEY,
    school_name varchar(30),
    location varchar(30),
    zip varchar(3),
    campus_number varchar(10),
    phone varchar(15),
    looking varchar(5),
    website text,
    statement_of_faith text,
    accreditation varchar(20),
    teachers_employed varchar(20),
    student_enrollment varchar(20),
    grade_range varchar(10),
    contact_email varchar(25),
    photo longblob,
    logo longblob,
    last_accessed datetime
);
DROP TABLE IF EXISTS Teacher_Profile;
DROP TABLE IF EXISTS Teacher_Staff_Profile;
CREATE TABLE Teacher_Staff_Profile (
    teacher_staff_id varchar(36) PRIMARY KEY,
    first_name varchar(15),
    last_name varchar(15),
    looking varchar(5),
    phone varchar(15),
    contact_email varchar(25),
    location varchar(30),
    zip varchar(3),
    home_church varchar(30),
    degree varchar(15),
    resume text,
    testimony text,
    cover_letter longblob,
    headshot longblob,
    last_accessed datetime
);
DROP TABLE IF EXISTS Job_Posting;
CREATE TABLE Job_Posting (
    job_id int AUTO_INCREMENT PRIMARY KEY,
    school_id varchar(36),
    job_title varchar(50),
    job_description text,
    job_location varchar(50),
    job_zip varchar(3),
    interview_location varchar(50),
    contact_email varchar(50),
    application_url text,
    salary_range text,
    preferred_degree varchar(50),
    required_degree varchar(50),
    preferred_experience text,
    required_experience text,
    posted_date datetime,
    FOREIGN KEY (school_id) REFERENCES School_Profile(school_id)
);
DROP TABLE IF EXISTS Reference;
CREATE TABLE Reference (
    references_id int AUTO_INCREMENT PRIMARY KEY,
    teacher_staff_id varchar(36),
    r1_name varchar(30),
    r1_relationship varchar(30),
    r1_relation_type varchar(15),
    r1_phone_number varchar(15),
    r1_email varchar(30),
    r2_name varchar(30),
    r2_relationship varchar(30),
    r2_relation_type varchar(15),
    r2_phone_number varchar(15),
    r2_email varchar(30),
    r3_name varchar(30),
    r3_relationship varchar(30),
    r3_relation_type varchar(15),
    r3_phone_number varchar(15),
    r3_email varchar(30),
    FOREIGN KEY (teacher_staff_id) REFERENCES Teacher_Staff_Profile(teacher_staff_id)
);
DROP TABLE IF EXISTS Saved_Jobs;
CREATE TABLE Saved_Jobs (
    saved_id int AUTO_INCREMENT PRIMARY KEY,
    job_id int,
    teacher_staff_id varchar(36),
    FOREIGN KEY (job_id) REFERENCES Job_Posting(job_id),
    FOREIGN KEY (teacher_staff_id) REFERENCES Teacher_Staff_Profile(teacher_staff_id)
);
DROP TABLE IF EXISTS Job_Applications;
CREATE TABLE Job_Applications (
    application_id int AUTO_INCREMENT PRIMARY KEY,
    job_id int,
    teacher_staff_id varchar(36),
    FOREIGN KEY (job_id) REFERENCES Job_Posting(job_id),
    FOREIGN KEY (teacher_staff_id) REFERENCES Teacher_Staff_Profile(teacher_staff_id)
);
DROP TABLE IF EXISTS Admin;
CREATE TABLE Admin (admin_id varchar(36) PRIMARY KEY);
#Inserts statement for School_Profile - NCA
INSERT INTO School_Profile (
        school_id,
        school_name,
        location,
        contact_email,
        grade_range,
        zip
    )
VALUES (
        'eeJ0oUJ7y8N8v3b3S3tETRaOiZJ3',
        'New Covenant Academy',
        'Missouri',
        'NCA@gmail.com',
        'K-12',
        '657'
    );
#Insert statement for School_Profile - SBU
INSERT INTO School_Profile (
        school_id,
        school_name,
        location,
        contact_email,
        grade_range,
        zip
    )
VALUES (
        'tISFQe9fyEZ009sI0ItWqJDB8of2',
        'Southwest Baptist University',
        'Missouri',
        'sbu@gmail.com',
        'College',
        '656'
    );
# Insert statement for Teacher_Staff_Profile - John Washington
INSERT INTO Teacher_Staff_Profile (
        teacher_staff_id,
        first_name,
        last_name,
        contact_email,
        degree,
        location,
        zip
    )
VALUES (
        'sOopgExukLMyzwdlnV4WTejwgkT2',
        'John',
        'Washington',
        'jWashington@gmail.com',
        'Bachelor',
        'Missouri',
        '656'
    );
# Insert statement for Teacher_Staff_Profile - Reginald Fitzgerald
INSERT INTO Teacher_Staff_Profile (
        teacher_staff_id,
        first_name,
        last_name,
        contact_email,
        degree,
        location,
        zip
    )
VALUES (
        'Fb3EBUkzqzQb6E7yzuin0RLrtpL2',
        'Reginald',
        'Fitzgerald',
        'rFitzgerald@gmail.com',
        'Master',
        'Kansas',
        '660'
    );
INSERT INTO Admin (admin_id)
VALUES ('JAfa7OAX1HaJumeHCD4tJhLXOi22');
SET FOREIGN_KEY_CHECKS = 1;