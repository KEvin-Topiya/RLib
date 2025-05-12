-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 12, 2025 at 02:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ru_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `EID` varchar(50) NOT NULL,
  `current_address` text NOT NULL,
  `permanent_address` text NOT NULL,
  `DOB` date NOT NULL,
  `profile` varchar(255) DEFAULT 'profile.png',
  `password` varchar(255) NOT NULL,
  `user_role` enum('admin','librarian','library') DEFAULT 'librarian',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administrator`
--

INSERT INTO `administrator` (`id`, `name`, `email`, `phone`, `EID`, `current_address`, `permanent_address`, `DOB`, `profile`, `password`, `user_role`, `created_at`) VALUES
(1, 'Admin User', 'admin@example.com', '9876543210', 'EID12345', 'Admin Street, City', 'Admin Permanent Address', '1985-08-20', 'default.png', '$2y$10$rcEwAhey7G6xBLkvAY6Qv.egbFNdjFROoQaWT67p6izE9Gri03UM.', 'librarian', '2025-02-12 15:42:16'),
(2, 'Admin', 'admin@gmail.com', '7896541230', 'ADMIN123', 'udaipur', 'udaipur', '2002-02-02', 'profile.png', '$2y$10$rcEwAhey7G6xBLkvAY6Qv.egbFNdjFROoQaWT67p6izE9Gri03UM.', 'admin', '2025-02-15 17:41:13'),
(3, 'library', 'library@r.r', '1234567890', 'lib', 'rai university', 'rai university', '2000-01-01', 'profile.png', '$2y$10$5soYSmtJwuWy1t8JUzROX.jVp6ssaIdbDs9PTRQIwskfQCWBNngTq', 'library', '2025-05-11 04:23:23');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `book_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `isbn` varchar(50) NOT NULL,
  `publication_year` int(11) NOT NULL,
  `total_issued` int(11) NOT NULL DEFAULT 0,
  `status` enum('available','not_available') NOT NULL DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `title`, `author`, `isbn`, `publication_year`, `total_issued`, `status`, `created_at`) VALUES
('1', 'The Excel Bible', 'John Walkenbach', '978-1118490365', 2013, 4, 'available', '2025-02-18 19:07:57'),
('10', 'Excel Macros For Dummies', 'Dick Kusleika', '978-1118490365', 2018, 6, 'available', '2025-02-18 19:07:57'),
('11', 'Excel for Accountants', 'Conrad George Carlberg', '978-0789739307', 2010, 7, 'not_available', '2025-02-18 19:07:57'),
('12', 'Advanced Excel Reporting for Management', 'Neale Blackwood', '978-1118657720', 2014, 1, 'available', '2025-02-18 19:07:57'),
('13', 'Excel Quick Start Guide', 'M.L. Humphrey', '978-1979214809', 2017, 0, 'available', '2025-02-18 19:07:57'),
('14', 'Microsoft Excel Inside Out', 'Mark Dodge', '978-0735623210', 2013, 0, 'available', '2025-02-18 19:07:57'),
('15', 'Excel 2019 Basics', 'Lalwani Lokesh', '978-9389611290', 2019, 0, 'available', '2025-02-18 19:07:57'),
('16', 'The Definitive Guide to DAX', 'Marco Russo', '978-1509306978', 2019, 0, 'available', '2025-02-18 19:07:57'),
('17', 'Excel Financial Modeling', 'Danielle Stein Fairhurst', '978-1119520382', 2019, 0, 'available', '2025-02-18 19:07:57'),
('18', 'Excel Automation with VBA', 'Richard Shepherd', '978-0071743729', 2011, 0, 'available', '2025-02-18 19:07:57'),
('19', 'Excel Formulas 101', 'Oz du Soleil', '978-1615470551', 2015, 0, 'available', '2025-02-18 19:07:57'),
('2', 'Excel Formulas &amp; Functions for Dummies', 'Ken Bluttman', '978-1119518259', 2018, 1, 'available', '2025-02-18 19:07:57'),
('20', 'Microsoft Excel Step by Step', 'Curtis Frye', '978-1509307753', 2020, 0, 'available', '2025-02-18 19:07:57'),
('21', 'Excel Power Pivot and Power Query', 'Leila Gharani', '978-1615472319', 2021, 0, 'available', '2025-02-18 19:07:57'),
('22', 'Excel for Engineers and Scientists', 'Ronald E. Walpole', '978-0131481976', 2006, 1, 'not_available', '2025-02-18 19:07:57'),
('222', 'sfgsg', 'sdff', '1234567891234', 2012, 0, 'available', '2025-05-11 21:56:28'),
('23', 'Microsoft Excel 365 Formulas', 'Paul McFedries', '978-0789758759', 2021, 0, 'available', '2025-02-18 19:07:57'),
('24', 'Excel Data Analysis Made Simple', 'Ankur Jain', '978-1787287706', 2017, 0, 'available', '2025-02-18 19:07:57'),
('25', 'Financial Analysis with Excel', 'Timothy R. Mayes', '978-0357108130', 2019, 0, 'available', '2025-02-18 19:07:57'),
('26', 'Data Visualization with Excel', 'Jonathan Schwabish', '978-0231188651', 2021, 0, 'available', '2025-02-18 19:07:57'),
('27', 'Excel in Depth', 'Bill Jelen', '978-0789747074', 2013, 0, 'available', '2025-02-18 19:07:57'),
('28', 'Excel for Scientists and Engineers', 'E. Joseph Billo', '978-0470381236', 2007, 0, 'available', '2025-02-18 19:07:57'),
('29', 'Excel Statistical Analysis', 'Joseph Schmuller', '978-1119271161', 2017, 0, 'available', '2025-02-18 19:07:57'),
('3', 'Excel Power Query and Power Pivot', 'Chris Dutton', '978-1119518253', 2020, 0, 'available', '2025-02-18 19:07:57'),
('30', 'Excel for Beginners', 'John Wiley', '978-1119476154', 2016, 0, 'available', '2025-02-18 19:07:57'),
('333', 'svsv', 'abc', '1234567891234', 2222, 0, 'available', '2025-05-11 21:51:47'),
('4', 'Excel 2019 Power Programming', 'Michael Alexander', '978-1119514923', 2019, 0, 'available', '2025-02-18 19:07:57'),
('4444', 'fsdg', 'bdbdfb', '12345678914123', 2222, 0, 'available', '2025-05-11 21:54:34'),
('5', 'Excel Data Analysis For Dummies', 'Stephen L. Nelson', '978-1119518167', 2020, 0, 'available', '2025-02-18 19:07:57'),
('6', 'Learn Excel in 24 Hours', 'Alex Nordeen', '978-9389845343', 2021, 0, 'available', '2025-02-18 19:07:57'),
('7', 'Excel 2016 for Beginners', 'M.L. Humphrey', '978-1975685979', 2016, 0, 'available', '2025-02-18 19:07:57'),
('8', 'Microsoft Excel Functions &amp; Formulas', 'Bernd Held', '978-1933241016', 2014, 0, 'available', '2025-02-18 19:07:57'),
('9', 'Excel Dashboards and Reports', 'Michael Alexander', '978-1119514756', 2019, 0, 'available', '2025-02-18 19:07:57');

-- --------------------------------------------------------

--
-- Table structure for table `fines`
--

CREATE TABLE `fines` (
  `fine_id` int(11) NOT NULL,
  `EnrollmentNo` varchar(50) NOT NULL,
  `book_id` int(11) NOT NULL,
  `due_date` date NOT NULL,
  `fine_amount` decimal(10,2) DEFAULT 0.00,
  `status` enum('unpaid','paid') DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fines`
--

INSERT INTO `fines` (`fine_id`, `EnrollmentNo`, `book_id`, `due_date`, `fine_amount`, `status`) VALUES
(1, '24MCA021', 10, '2025-03-22', 25.00, 'unpaid'),
(2, 'test', 11, '2025-05-15', 50.00, 'unpaid');

-- --------------------------------------------------------

--
-- Table structure for table `grids`
--

CREATE TABLE `grids` (
  `id` int(11) NOT NULL,
  `grid_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`grid_data`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `grids`
--

INSERT INTO `grids` (`id`, `grid_data`, `created_at`, `updated_at`) VALUES
(1, '{\"title\":\"My Grid Plan\",\"rows\":9,\"cols\":13,\"grid\":[[{\"label\":\"entery\",\"color\":\"#8B4513\",\"type\":\"door\",\"groupId\":\"1746788598743\"},null,{\"label\":\"Scanner\",\"color\":\"#ed333b\",\"type\":\"table\",\"groupId\":\"1746788574806\"},null,null,null,null,{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"}],[null,null,null,null,null,null,null,{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"},{\"label\":\"MCA\",\"color\":\"#1c71d8\",\"type\":\"bookshelf\",\"groupId\":\"1746788521783\"}],[null,null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"}],[{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},null,null,null,null,{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"},{\"label\":\"BBA\",\"color\":\"#2ec27e\",\"type\":\"bookshelf\",\"groupId\":\"1746788533301\"}],[{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},null,{\"label\":\"reading\",\"color\":\"#813d9c\",\"type\":\"table\",\"groupId\":\"1746788617513\"},null,null,null,null,null,null,null,null],[{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},null,null,null,null,{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"}],[{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},{\"label\":\"BTECH\",\"color\":\"#865e3c\",\"type\":\"desk\",\"groupId\":\"1746788561198\"},null,null,null,null,{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"},{\"label\":\"BTECH\",\"color\":\"#f5c211\",\"type\":\"bookshelf\",\"groupId\":\"1746788545096\"}],[null,null,null,null,null,null,null,null,null,null,null,null,null]]}', '2025-05-10 22:19:28', '2025-05-10 22:45:18');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `book_id` varchar(50) NOT NULL,
  `EnrollmentNo` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `issued_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `book_id`, `EnrollmentNo`, `title`, `issued_date`) VALUES
(23, '1', '24MCA009', 'The Excel Bible', '2025-03-07'),
(24, '1', '24MCA009', 'The Excel Bible', '2025-03-07'),
(25, '10', '24MCA009', 'Excel Macros For Dummies', '2025-03-07'),
(26, '10', '24MCA009', 'Excel Macros For Dummies', '2025-03-07'),
(27, '11', '24MCA009', 'Excel for Accountants', '2025-03-07'),
(28, '12', '24MCA009', 'Advanced Excel Reporting for Management', '2025-03-07'),
(29, '10', '24MCA009', 'Excel Macros For Dummies', '2025-03-07'),
(30, '10', '24MCA009', 'Excel Macros For Dummies', '2025-03-07'),
(31, '10', '24MCA009', 'Excel Macros For Dummies', '2025-03-07'),
(32, '11', 'test', 'Excel for Accountants', '2025-03-24'),
(33, '11', 'test', 'Excel for Accountants', '2025-03-25'),
(34, '11', 'test', 'Excel for Accountants', '2025-03-28'),
(35, '11', 'test', 'Excel for Accountants', '2025-03-28'),
(36, '1', 'test', 'The Excel Bible', '2025-05-11'),
(37, '10', '24MCA021', 'Excel Macros For Dummies', '2025-03-07'),
(38, '11', 'test', 'Excel for Accountants', '2025-05-11'),
(39, '1', 'test', 'The Excel Bible', '2025-05-12'),
(40, '2', 'test', 'Excel Formulas &amp; Functions for Dummies', '2025-05-12');

-- --------------------------------------------------------

--
-- Table structure for table `issued_books`
--

CREATE TABLE `issued_books` (
  `id` int(11) NOT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `EnrollmentNo` varchar(50) DEFAULT NULL,
  `issued_date` date DEFAULT NULL,
  `last_date` date DEFAULT NULL,
  `renew_left` int(11) DEFAULT 3
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `issued_books`
--

INSERT INTO `issued_books` (`id`, `book_id`, `EnrollmentNo`, `issued_date`, `last_date`, `renew_left`) VALUES
(40, '11', 'test', '2025-05-12', '2025-05-26', 3),
(41, '22', 'test', '2025-05-12', '2025-05-26', 3);

--
-- Triggers `issued_books`
--
DELIMITER $$
CREATE TRIGGER `after_delete_issued_books` AFTER DELETE ON `issued_books` FOR EACH ROW BEGIN
    -- Insert return log into history table
    INSERT INTO history (book_id, EnrollmentNo, title, issued_date)
    SELECT OLD.book_id, u.EnrollmentNo, b.title, OLD.issued_date
    FROM users u
    JOIN books b ON b.book_id = OLD.book_id
    WHERE u.EnrollmentNo = OLD.EnrollmentNo;

    -- Update book status to 'available' when returned
    UPDATE books 
    SET status = 'available' 
    WHERE book_id = OLD.book_id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_issued_books` AFTER INSERT ON `issued_books` FOR EACH ROW BEGIN
    -- Update book status to 'unavailable' when issued
    UPDATE books 
    SET status = 'not_available' 
    WHERE book_id = NEW.book_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `library_entry`
--

CREATE TABLE `library_entry` (
  `id` int(11) NOT NULL,
  `EnrollmentNo` varchar(50) NOT NULL,
  `entry_time` datetime DEFAULT current_timestamp(),
  `exit_time` datetime DEFAULT NULL,
  `status` enum('in','out') DEFAULT 'in'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `library_entry`
--

INSERT INTO `library_entry` (`id`, `EnrollmentNo`, `entry_time`, `exit_time`, `status`) VALUES
(1, 'test', '2025-05-11 05:49:45', '2025-05-11 05:50:14', 'out'),
(2, 'lib', '2025-05-11 05:50:07', '2025-05-11 05:50:19', 'out'),
(3, 'test', '2025-05-11 05:51:35', '2025-05-11 05:51:41', 'out');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `EnrollmentNo` varchar(50) NOT NULL,
  `noti_title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('unseen','seen') DEFAULT 'unseen',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `seen_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `EnrollmentNo`, `noti_title`, `description`, `status`, `created_at`, `seen_at`) VALUES
(2, '24MCA009', 'book_issued', 'Your Book ID: 10 has been issued successfully. Due date: 2025-03-21.', 'unseen', '2025-03-07 10:49:31', NULL),
(3, '24MCA009', 'Book_returned', 'Your Book ID: 10 has been returned successfully.', 'unseen', '2025-03-07 10:52:17', NULL),
(4, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-04-07.', 'seen', '2025-03-24 15:52:56', NULL),
(5, 'test', 'Book_returned', 'Your Book ID: 11 has been returned successfully.', 'seen', '2025-03-24 21:37:54', NULL),
(6, '24MCA021', 'Book_issued', 'Your Book ID: 10 has been issued successfully. Due date: 2025-04-08.', 'unseen', '2025-03-25 05:54:55', NULL),
(7, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-04-08.', 'seen', '2025-03-25 10:27:31', NULL),
(8, 'test', 'Book_returned', 'Your Book ID: 11 has been returned successfully.', 'seen', '2025-03-25 10:27:50', NULL),
(9, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-04-11.', 'seen', '2025-03-28 09:37:27', NULL),
(10, 'test', 'Book_returned', 'Your Book ID: 11 has been returned successfully.', 'seen', '2025-03-28 09:37:50', NULL),
(11, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-04-11.', 'seen', '2025-03-28 09:38:11', NULL),
(12, 'test', 'Book_returned', 'Your Book ID: 11 has been returned successfully.', 'seen', '2025-03-28 09:38:29', NULL),
(13, 'test', 'password_updated', 'Your password has been updated successfully.', 'unseen', '2025-05-11 01:25:04', NULL),
(14, 'test', 'Book_issued', 'Your Book ID: 1 has been issued successfully. Due date: 2025-05-25.', 'unseen', '2025-05-11 01:31:52', NULL),
(15, 'test', 'password_updated', 'Your password has been updated successfully.', 'unseen', '2025-05-11 06:00:56', NULL),
(16, 'test', 'Book_returned', 'Your Book ID: 1 has been returned successfully.', 'unseen', '2025-05-11 21:19:10', NULL),
(17, '24MCA021', 'Book_returned', 'Your Book ID: 10 has been returned successfully.', 'unseen', '2025-05-11 21:24:21', NULL),
(18, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-05-25.', 'unseen', '2025-05-11 21:29:53', NULL),
(19, 'test', 'Book_returned', 'Your Book ID: 11 has been returned successfully.', 'unseen', '2025-05-11 22:22:25', NULL),
(20, 'test', 'Book_issued', 'Your Book ID: 1 has been issued successfully. Due date: 2025-05-26.', 'unseen', '2025-05-11 22:23:23', NULL),
(21, 'test', 'Book_issued', 'Your Book ID: 11 has been issued successfully. Due date: 2025-05-26.', 'unseen', '2025-05-11 22:23:26', NULL),
(22, 'test', 'Book_issued', 'Your Book ID: 22 has been issued successfully. Due date: 2025-05-26.', 'unseen', '2025-05-11 22:23:39', NULL),
(23, 'test', 'Book_issued', 'Your Book ID: 2 has been issued successfully. Due date: 2025-05-26.', 'unseen', '2025-05-11 22:23:42', NULL),
(24, 'test', 'Book_returned', 'Your Book ID: 1 has been returned successfully.', 'unseen', '2025-05-11 22:24:06', NULL),
(25, 'test', 'Book_returned', 'Your Book ID: 2 has been returned successfully.', 'unseen', '2025-05-11 22:24:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL,
  `EnrollmentNo` varchar(50) NOT NULL,
  `fine_id` int(11) NOT NULL,
  `transaction_id` varchar(100) NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `payments`
--
DELIMITER $$
CREATE TRIGGER `update_fine_status_after_payment` AFTER INSERT ON `payments` FOR EACH ROW BEGIN
    UPDATE fines 
    SET status = 'paid' 
    WHERE fine_id = NEW.fine_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `EnrollmentNo` varchar(20) NOT NULL,
  `StudentName` varchar(100) NOT NULL,
  `PhoneStudent` varchar(15) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `EmailAlternate` varchar(100) NOT NULL,
  `AcademicYearName` varchar(10) NOT NULL,
  `ProgramName` varchar(50) NOT NULL,
  `Semester` int(11) NOT NULL,
  `password` varchar(200) DEFAULT NULL,
  `profile` varchar(50) NOT NULL DEFAULT 'profile.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`EnrollmentNo`, `StudentName`, `PhoneStudent`, `Email`, `EmailAlternate`, `AcademicYearName`, `ProgramName`, `Semester`, `password`, `profile`) VALUES
('24MCA009', 'Renish Limbasiya', '8799039344', 'rlimbasiya090@gmail.com', '24MCA009@raiuniversity.edu', '2024-25', 'RSE - MCA', 2, '$2y$10$9dyT9BWjwq/yMwd4H.k22OL8qHsxTqgMVggEo25E7JrBDtL7lZE.6', 'profile.png'),
('24MCA021', 'Vikas Meena', '8107557454', 'meena.vikas1102@gmail.com', '24MCA021@raiuniversity.edu', '2024-25', 'RSE-MCA', 2, 'mRFfKtk4', 'profile.png'),
('test', 'test', '6356893665', 'ktopiya027@rku.ac.in', 'test@t.t', '2024-26', 'test', 2, '$2y$10$rmXWfB6EqF6Vi2kILONsLeCKJ6o6vVfbTrJ4uAtj9kYp9LxYwFArK', 'kill.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `EID` (`EID`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD UNIQUE KEY `book_id` (`book_id`);
ALTER TABLE `books` ADD FULLTEXT KEY `isbn` (`isbn`);

--
-- Indexes for table `fines`
--
ALTER TABLE `fines`
  ADD PRIMARY KEY (`fine_id`);

--
-- Indexes for table `grids`
--
ALTER TABLE `grids`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `EnrollmentNo` (`EnrollmentNo`);

--
-- Indexes for table `issued_books`
--
ALTER TABLE `issued_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `EnrollmentNo` (`EnrollmentNo`);

--
-- Indexes for table `library_entry`
--
ALTER TABLE `library_entry`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD UNIQUE KEY `transaction_id` (`transaction_id`),
  ADD KEY `EnrollmentNo` (`EnrollmentNo`),
  ADD KEY `fine_id` (`fine_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`EnrollmentNo`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `EmailAlternate` (`EmailAlternate`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fines`
--
ALTER TABLE `fines`
  MODIFY `fine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `grids`
--
ALTER TABLE `grids`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `issued_books`
--
ALTER TABLE `issued_books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `library_entry`
--
ALTER TABLE `library_entry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`EnrollmentNo`) REFERENCES `users` (`EnrollmentNo`) ON DELETE CASCADE;

--
-- Constraints for table `issued_books`
--
ALTER TABLE `issued_books`
  ADD CONSTRAINT `issued_books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`book_id`),
  ADD CONSTRAINT `issued_books_ibfk_2` FOREIGN KEY (`EnrollmentNo`) REFERENCES `users` (`EnrollmentNo`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`EnrollmentNo`) REFERENCES `users` (`EnrollmentNo`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`fine_id`) REFERENCES `fines` (`fine_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
