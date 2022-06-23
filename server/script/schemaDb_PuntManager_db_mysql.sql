--
-- Database: `puntmanager_db`
--

CREATE DATABASE IF NOT EXISTS `puntmanager_db`;
USE `puntmanager_db`;


-- ENTITIES

--
-- Struttura della tabella `game`
--

CREATE TABLE IF NOT EXISTS `game` (
	`Ended` date ,
	`Started` date  NOT NULL,
	`Status` numeric  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `game`
--

CREATE TABLE IF NOT EXISTS `game` (
	`Ended` date ,
	`Started` date  NOT NULL,
	`Status` numeric  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `game`
--

CREATE TABLE IF NOT EXISTS `game` (
	`Ended` date ,
	`Started` date  NOT NULL,
	`Status` numeric  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `game`
--

CREATE TABLE IF NOT EXISTS `game` (
	`Ended` date ,
	`Started` date  NOT NULL,
	`Status` numeric  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `game`
--

CREATE TABLE IF NOT EXISTS `game` (
	`BuyInAmount` int ,
	`Started` date  NOT NULL,
	`Status` int  NOT NULL,
	`Stopped` date ,
	`TableList` varchar(30) ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `player`
--

CREATE TABLE IF NOT EXISTS `player` (
	`Added` date  NOT NULL,
	`CasinoPlayerID` varchar(130) ,
	`FirstTimePlayer` bool  NOT NULL,
	`FullName` varchar(130)  NOT NULL,
	`PlayerWallet` varchar(30) ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `playerwallet`
--

CREATE TABLE IF NOT EXISTS `playerwallet` (
	`PlayerActive` bool ,
	`PlayerWallet` int ,
	`PlayerWinnings` int ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `table`
--

CREATE TABLE IF NOT EXISTS `table` (
	`PlayersList` varchar(30)  NOT NULL,
	`TablePool` int ,
	`TablePot` int ,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


--
-- Struttura della tabella `user`
--

CREATE TABLE IF NOT EXISTS `user` (
	`mail` varchar(130) ,
	`name` varchar(130) ,
	`password` varchar(130)  NOT NULL,
	`roles` varchar(130) ,
	`surname` varchar(130) ,
	`username` varchar(130)  NOT NULL,
	
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);


-- Security

ALTER TABLE `user` MODIFY COLUMN `password` varchar(128)  NOT NULL;

INSERT INTO `puntmanager_db`.`user` (`username`, `password`, `_id`) VALUES ('admin', '62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5', 1);

CREATE TABLE IF NOT EXISTS `roles` (
	`role` varchar(30) ,
	
	-- RELAZIONI

	`_user` int(11)  NOT NULL REFERENCES user(_id),
	`_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT 

);
INSERT INTO `puntmanager_db`.`roles` (`role`, `_user`, `_id`) VALUES ('ADMIN', '1', 1);





-- relation 1:m GameTables Game - Table
ALTER TABLE `game` ADD COLUMN `GameTables` int(11)  REFERENCES table(_id);

-- relation 1:m TablePlayer Table - Player
ALTER TABLE `table` ADD COLUMN `TablePlayer` int(11)  REFERENCES player(_id);


