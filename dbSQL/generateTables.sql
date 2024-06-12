CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SELECT
	*
FROM
	pg_extension
WHERE
	extname = 'uuid-ossp';

CREATE TABLE
	users (
		user_id serial PRIMARY KEY,
		u_name varchar(30) NOT NULL,
		u_email varchar(30) UNIQUE NOT NULL,
		u_pass varchar(100) NOT NULL,
		u_unit varchar(10) NOT NULL,
		u_appt varchar(30) NOT NULL,
		u_sign uuid DEFAULT uuid_generate_v4 () UNIQUE
	)
CREATE TABLE
	personnel (
		person_id serial PRIMARY KEY,
		name varchar(30) NOT NULL,
		nric varchar(9) UNIQUE NOT NULL,
		unit varchar(10) NOT NULL,
		ord date,
		service varchar(10),
		vocation varchar(10),
		team varchar(10)
	)
CREATE TABLE
	qualification (
		q_id serial PRIMARY KEY,
		q_code varchar(10) UNIQUE NOT NULL,
		q_name varchar(30) NOT NULL,
		task1 varchar(100),
		task2 varchar(100),
		task3 varchar(100)
	)
INSERT INTO
	qualification (q_code, q_name, task1, task2, task3)
VALUES
	(
		'RRR02',
		'haulage',
		'dumptruck',
		'excavator',
		'compactor'
	)
VALUES
	(
		'AFL01',
		'airfield lights',
		'replace bulb & fittings',
		'replace transformer',
		'replace cable'
	)
VALUES
	(
		'RRR01',
		'runway repair',
		'pothole',
		'medium crater',
		'large crater'
	)
VALUES
	(
		'AAS01',
		'hookwire',
		'replace tape',
		'replace block',
		'disengage'
	)
CREATE TABLE
	authorisation (
		ath_id serial PRIMARY KEY,
		p_id integer NOT NULL REFERENCES personnel (person_id),
		q_code varchar NOT NULL REFERENCES qualification (q_code),
		q_type varchar(10) NOT NULL,
		q_date date,
		task1 date,
		task2 date,
		task3 date,
		instructor_sign uuid REFERENCES users (u_sign),
		instructor_ts TIMESTAMPTZ,
		trainingIC_sign uuid REFERENCES users (u_sign),
		trainingIC_ts TIMESTAMPTZ,
		officer_sign uuid REFERENCES users (u_sign),
		officer_ts TIMESTAMPTZ
	)