-- MySQL dump 10.15  Distrib 10.0.22-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	10.0.22-MariaDB-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BOOK`
--

DROP TABLE IF EXISTS `BOOK`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOK` (
  `Book_id` varchar(20) NOT NULL,
  `Title` varchar(50) NOT NULL,
  `Publisher_name` varchar(20) NOT NULL,
  PRIMARY KEY (`Book_id`),
  KEY `Publisher_name` (`Publisher_name`),
  CONSTRAINT `BOOK_ibfk_1` FOREIGN KEY (`Publisher_name`) REFERENCES `PUBLISHER` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK`
--

LOCK TABLES `BOOK` WRITE;
/*!40000 ALTER TABLE `BOOK` DISABLE KEYS */;
INSERT INTO `BOOK` VALUES ('12345','The Poetry Anthology','Big Publisher'),('34567','Red Badge of Courage','University Publishin'),('45678','Treasure Island','Big Publisher'),('56789','March','International Press'),('67890','War and Peace','University Publishin'),('77777','Long Winded Narrative','Small Press'),('88888','Life on Mars','Small Press'),('99999','Black House','Small Press');
/*!40000 ALTER TABLE `BOOK` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK_AUTHORS`
--

DROP TABLE IF EXISTS `BOOK_AUTHORS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOK_AUTHORS` (
  `Book_id` varchar(20) NOT NULL,
  `Author_name` varchar(20) NOT NULL,
  PRIMARY KEY (`Book_id`,`Author_name`),
  CONSTRAINT `BOOK_AUTHORS_ibfk_1` FOREIGN KEY (`Book_id`) REFERENCES `BOOK` (`Book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK_AUTHORS`
--

LOCK TABLES `BOOK_AUTHORS` WRITE;
/*!40000 ALTER TABLE `BOOK_AUTHORS` DISABLE KEYS */;
INSERT INTO `BOOK_AUTHORS` VALUES ('12345','Joseph Parisi'),('12345','Stephen Young'),('12345','Third Author'),('34567','Stephen Crane'),('45678','Robert Louis Stevens'),('56789','Geraldine Brooks'),('67890','Leo Tolstoy'),('77777','Ghost Writer'),('77777','Prolific Author'),('88888','Tracy K. Smith'),('99999','Stephen King');
/*!40000 ALTER TABLE `BOOK_AUTHORS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK_COPIES`
--

DROP TABLE IF EXISTS `BOOK_COPIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOK_COPIES` (
  `Book_id` varchar(15) NOT NULL,
  `Branch_id` varchar(20) NOT NULL,
  `No_of_copies` int(11) NOT NULL,
  PRIMARY KEY (`Book_id`,`Branch_id`),
  KEY `Branch_id` (`Branch_id`),
  CONSTRAINT `BOOK_COPIES_ibfk_1` FOREIGN KEY (`Book_id`) REFERENCES `BOOK` (`Book_id`),
  CONSTRAINT `BOOK_COPIES_ibfk_2` FOREIGN KEY (`Branch_id`) REFERENCES `LIBRARY_BRANCH` (`Branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK_COPIES`
--

LOCK TABLES `BOOK_COPIES` WRITE;
/*!40000 ALTER TABLE `BOOK_COPIES` DISABLE KEYS */;
INSERT INTO `BOOK_COPIES` VALUES ('12345','BranchA',5),('34567','BranchC',2),('45678','BranchC',6),('56789','BranchB',1),('67890','BranchB',3),('77777','BranchA',3),('77777','BranchB',6),('77777','BranchC',0),('88888','BranchA',12),('88888','BranchB',2),('88888','BranchC',7),('99999','BranchA',9),('99999','BranchB',4),('99999','BranchC',1);
/*!40000 ALTER TABLE `BOOK_COPIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BOOK_LOANS`
--

DROP TABLE IF EXISTS `BOOK_LOANS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BOOK_LOANS` (
  `Book_id` varchar(15) NOT NULL,
  `Branch_id` varchar(20) NOT NULL,
  `Card_no` varchar(15) NOT NULL,
  `Date_out` date NOT NULL,
  `Due_date` date NOT NULL,
  PRIMARY KEY (`Book_id`,`Branch_id`,`Card_no`),
  KEY `Branch_id` (`Branch_id`),
  KEY `Card_no` (`Card_no`),
  CONSTRAINT `BOOK_LOANS_ibfk_1` FOREIGN KEY (`Book_id`) REFERENCES `BOOK` (`Book_id`),
  CONSTRAINT `BOOK_LOANS_ibfk_2` FOREIGN KEY (`Branch_id`) REFERENCES `LIBRARY_BRANCH` (`Branch_id`),
  CONSTRAINT `BOOK_LOANS_ibfk_3` FOREIGN KEY (`Card_no`) REFERENCES `BORROWER` (`Card_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BOOK_LOANS`
--

LOCK TABLES `BOOK_LOANS` WRITE;
/*!40000 ALTER TABLE `BOOK_LOANS` DISABLE KEYS */;
INSERT INTO `BOOK_LOANS` VALUES ('12345','BranchA','C1','2013-02-28','2013-03-29'),('34567','BranchA','C1','2013-02-12','2013-03-15'),('45678','BranchB','C2','2013-03-01','2013-03-18'),('77777','BranchA','C1','2013-03-18','2013-04-10');
/*!40000 ALTER TABLE `BOOK_LOANS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BORROWER`
--

DROP TABLE IF EXISTS `BORROWER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BORROWER` (
  `Card_no` varchar(15) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Card_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BORROWER`
--

LOCK TABLES `BORROWER` WRITE;
/*!40000 ALTER TABLE `BORROWER` DISABLE KEYS */;
INSERT INTO `BORROWER` VALUES ('C1','Avid Reader','111 Main St.','1234567890'),('C2','Book Worm','456 Major Blvd.','9995551234');
/*!40000 ALTER TABLE `BORROWER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIBRARY_BRANCH`
--

DROP TABLE IF EXISTS `LIBRARY_BRANCH`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIBRARY_BRANCH` (
  `Branch_id` varchar(20) NOT NULL,
  `Branch_name` varchar(20) NOT NULL,
  `Address` varchar(20) NOT NULL,
  PRIMARY KEY (`Branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIBRARY_BRANCH`
--

LOCK TABLES `LIBRARY_BRANCH` WRITE;
/*!40000 ALTER TABLE `LIBRARY_BRANCH` DISABLE KEYS */;
INSERT INTO `LIBRARY_BRANCH` VALUES ('BranchA','Main Library','678 Main St.'),('BranchB','County Branch','1345 Forrest Dr.'),('BranchC','East Branch ','18 E. 4th St.');
/*!40000 ALTER TABLE `LIBRARY_BRANCH` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PUBLISHER`
--

DROP TABLE IF EXISTS `PUBLISHER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PUBLISHER` (
  `Name` varchar(20) NOT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PUBLISHER`
--

LOCK TABLES `PUBLISHER` WRITE;
/*!40000 ALTER TABLE `PUBLISHER` DISABLE KEYS */;
INSERT INTO `PUBLISHER` VALUES ('Big Publisher','New York City','5551236767'),('International Press','London','5553334444'),('Small Press','Paris','5559997654'),('University Publishin','San Francisco','5559871234');
/*!40000 ALTER TABLE `PUBLISHER` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-11-13 13:56:09
