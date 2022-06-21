--
-- Database: puntmanager_db
--

CREATE DATABASE puntmanager_db;

-- ENTITIES

--
-- Schema entity game
--

CREATE TABLE IF NOT EXISTS "game" (
	Ended date ,
	Started date  NOT NULL,
	Status numeric  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity game
--

CREATE TABLE IF NOT EXISTS "game" (
	Ended date ,
	Started date  NOT NULL,
	Status numeric  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity game
--

CREATE TABLE IF NOT EXISTS "game" (
	Ended date ,
	Started date  NOT NULL,
	Status numeric  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity game
--

CREATE TABLE IF NOT EXISTS "game" (
	Ended date ,
	Started date  NOT NULL,
	Status numeric  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity game
--

CREATE TABLE IF NOT EXISTS "game" (
	Status numeric  NOT NULL,
	TableList varchar(30) ,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity player
--

CREATE TABLE IF NOT EXISTS "player" (
	Added date  NOT NULL,
	CasinoPlayerID varchar(130) ,
	FirstTimePlayer bool  NOT NULL,
	FullName varchar(130)  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity table
--

CREATE TABLE IF NOT EXISTS "table" (
	PlayersList varchar(30)  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);

--
-- Schema entity user
--

CREATE TABLE IF NOT EXISTS "user" (
	mail varchar(130) ,
	name varchar(130) ,
	password varchar(130)  NOT NULL,
	roles varchar(130) ,
	surname varchar(130) ,
	username varchar(130)  NOT NULL,
	
	_id SERIAL PRIMARY KEY

);


-- Security

ALTER TABLE "user" ALTER COLUMN "password" TYPE varchar(128);

INSERT INTO "user" (username, password, _id) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS "roles" (
	role varchar(30) ,
	
	-- RELAZIONI

	_user INTEGER  NOT NULL REFERENCES "user"(_id),
	_id SERIAL PRIMARY KEY 

);
INSERT INTO "roles" (role, _user, _id) VALUES ('ADMIN', '1', 1);




-- relation 1:m GameTables Game - Table
ALTER TABLE game ADD COLUMN GameTables INTEGER  REFERENCES "table"(_id);

-- relation 1:m TablePlayer Table - Player
ALTER TABLE table ADD COLUMN TablePlayer INTEGER  REFERENCES "player"(_id);
