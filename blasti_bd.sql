-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 24, 2019 at 12:34 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blasti_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `info_line` varchar(20) NOT NULL,
  `image_url` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `special` tinyint(1) NOT NULL,
  `tickets` int(11) NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `name`, `description`, `info_line`, `image_url`, `address`, `start_date`, `end_date`, `user_id`, `category`, `special`, `tickets`, `price`) VALUES
(13, 'LA REINE DES NEIGES', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '53057144', 'film.jpg', 'La Mannouba, Tunisie', '2019-01-15 04:18:35', '2018-12-18 00:00:00', 2, 3, 1, 150, 5),
(14, 'Paul POGBA', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '50834697', 'foot.jpg', 'Ariana, Tunisie', '2018-12-18 00:00:00', '2018-12-26 00:00:00', 2, 4, 1, 20, 7),
(15, 'Funky FUN', 'Après six ans d’absence, Jamel est de retour sur scène, son terrain de jeu favori. Entre vie personnelle et sujets d’actualité, il nous raconte son rapport au public, nous parle de la peur ou encore du racisme décomplexé dans un spectacle d’une heure et demi de rire mis en scène par Mohamed Hamidi.  Si vous […]', '24539942', 'funky.jpg', 'La Marsa, tunisie, Tunis', '2019-02-19 00:00:00', '2018-12-06 00:00:00', 2, 1, 0, 500, 15),
(16, 'Grease', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '53057144', 'grease.jpg', 'Sfax, Tunisie', '2019-01-21 00:00:00', '2018-12-12 00:00:00', 2, 3, 1, 30, 9),
(17, 'Hssin eddik et hadhret Rjel Tounes', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '24539942', 'hassine.jpg', 'El Chebba', '2018-12-17 00:00:00', '2018-12-20 00:00:00', 2, 1, 1, 40, 30),
(18, 'NEW YEAR', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '26983424', 'light.jpg', 'La Marsa', '2018-12-29 00:00:00', '2018-12-31 00:00:00', 2, 2, 1, 14, 17),
(19, 'RAGHEB', 'Après six ans d’absence, Jamel est de retour sur scène, son terrain de jeu favori. Entre vie personnelle et sujets d’actualité, il nous raconte son rapport au public, nous parle de la peur ou encore du racisme décomplexé dans un spectacle d’une heure et demi de rire mis en scène par Mohamed Hamidi.  Si vous […]', '24539942', 'ragheb.jpg', 'Sousse', '2018-12-10 00:00:00', '2018-12-14 08:34:14', 2, 3, 1, 20, 20),
(20, 'HAPPY NEW YEAR', 'Les deux grands spectacles internationaux . le livre de la jungle est un spectacle musical qui nous raconte cette merveilleuse histoire où on retrouve sur scène tous les personnages du célèbre roman de Rudyard kipling. Pas moins de neuf artistes sur scène : Danseurs,comédiens et Chanteurs pour ce nouveau grand spéctacle musical qui passionnera autant […]', '53057144', 'samozin.jpg', 'Mahdeya', '2018-12-26 08:14:08', '2018-12-31 07:10:26', 2, 2, 0, 80, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `tickets` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`event_id`),
  KEY `reservation_event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `event_id`, `tickets`, `date`) VALUES
(4, 1, 14, 2, '2018-12-16 14:03:25'),
(5, 1, 17, 10, '2018-12-16 14:04:02'),
(6, 1, 17, 5, '2018-12-16 14:07:07'),
(7, 1, 17, 5, '2018-12-16 19:48:33'),
(8, 1, 18, 13, '2018-12-16 19:51:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `shipping_address` varchar(100) NOT NULL,
  `billing_address` varchar(100) NOT NULL,
  `role` int(11) NOT NULL,
  `isConfirmed` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `shipping_address`, `billing_address`, `role`, `isConfirmed`) VALUES
(1, 'Seif', 'Abdennadher', 'seif@gmail.com', '12345', 'TEST', 'TEST', 0, 0),
(2, 'Olfa', 'Karoui', 'olfa@gmail.com', '12345', 'qjd', 'qslkjd', 1, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `event_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservation_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
