-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 19, 2024 at 12:17 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_vinadesign`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cart_items_table`
--

CREATE TABLE `Cart_items_table` (
  `cart_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_specification` varchar(255) NOT NULL,
  `total_money` decimal(10,2) NOT NULL,
  `note` text NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `congno`
--

CREATE TABLE `congno` (
  `ID` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `product_details` text NOT NULL,
  `price` decimal(10,3) NOT NULL,
  `status` varchar(100) NOT NULL,
  `bill_photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `congno`
--

INSERT INTO `congno` (`ID`, `order_id`, `company_name`, `product_details`, `price`, `status`, `bill_photo`, `created_at`) VALUES
(12, 0, '12', '12', 12.000, '12', NULL, '2024-09-16 03:41:00'),
(13, 0, '12', '12', 12.000, '12', NULL, '2024-09-16 03:58:57'),
(14, 1234, 'Sao Viet ', 'Bat ', 120.000, 'Đang thực hiện', NULL, '2024-09-16 18:28:14'),
(15, 889, 'Sao Hoang', 'Poster ', 12.000, 'Đã thanh toán đủ ', NULL, '2024-09-16 19:08:01'),
(16, 123, 'Sao Viet ', 'Decal ', 155.000, 'Đã thanh toán đủ ', NULL, '2024-09-17 02:50:59'),
(17, 889, 'Sao Hoang', 'Posteer', 120.000, 'Đã thanh toán đủ ', 'uploads/1726638943454-blob', '2024-09-18 05:55:43'),
(18, 200, 'Sao Hoang', 'Posteer', 2000.000, 'Chưa hoàn tất ', 'uploads/1726639094459-blob', '2024-09-18 05:58:14'),
(19, 210, 'Sao Viet ', 'Format ', 255.000, 'Đã thanh toán đủ ', NULL, '2024-09-18 06:16:20'),
(20, 355, 'Sao Hoang', 'Decal ', 120.000, 'Đã thanh toán đủ ', 'uploads/1726640203521-blob', '2024-09-18 06:16:43'),
(21, 208, 'Thiên An', 'Format ', 1200.000, 'Chưa hoàn tất ', '/uploads/1726640349263-blob', '2024-09-18 06:19:09'),
(22, 234, 'Sao Viet ', 'Decal ', 255.000, 'Đã thanh toán đủ ', '/uploads/1726640632408-blob', '2024-09-18 06:23:52'),
(23, 210, 'Sao Hoang', 'Decal ', 120.000, 'Đã thanh toán đủ ', '/uploads/1726640832540-blob', '2024-09-18 06:27:12'),
(24, 123, 'Sao Hoang', 'Decal ', 2000.000, 'Đã thanh toán đủ ', '/uploads/1726640872874-blob', '2024-09-18 06:27:52'),
(25, 444, 'Sao Hoang', 'Poster ', 120.000, 'Đã thanh toán đủ ', '/uploads/1726640970574-blob', '2024-09-18 06:29:30'),
(26, 211, 'Sao Hoang', 'Decal ', 12.000, 'Đã thanh toán đủ ', NULL, '2024-09-18 06:55:02'),
(27, 889, 'Sao Viet ', 'Decal ', 120.000, 'Đã thanh toán đủ ', '/uploads/1726642698517-blob', '2024-09-18 06:58:18'),
(28, 345, 'Sao Viet ', 'Decal ', 300.000, 'Đã thanh toán đủ ', '/uploads/1726716130492-blob', '2024-09-19 03:22:10'),
(29, 311, 'Sao Viet ', 'Poster ', 120.000, 'Đã thanh toán đủ ', '/uploads/1726731489512-blob', '2024-09-19 07:38:09'),
(30, 233, 'Sao Hoang', 'Poster ', 2000.000, 'Đã thanh toán đủ ', '/uploads/1726732144500-blob', '2024-09-19 07:49:04');

-- --------------------------------------------------------

--
-- Table structure for table `customer_order`
--

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `staff_name` varchar(100) NOT NULL,
  `designer` varchar(100) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `product_details` text DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_width` decimal(10,2) DEFAULT NULL,
  `product_length` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,3) DEFAULT NULL,
  `total_price` decimal(10,3) DEFAULT NULL,
  `vat` decimal(10,3) DEFAULT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_timing` datetime NOT NULL,
  `delivery_method` varchar(50) NOT NULL,
  `discount` decimal(10,3) DEFAULT NULL,
  `amount_to_pay` decimal(10,3) DEFAULT NULL,
  `deposited` decimal(10,3) NOT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` text DEFAULT NULL,
  `delivery_company` varchar(255) DEFAULT NULL,
  `delivery_fee` decimal(10,2) DEFAULT 0.00,
  `delivery_address` varchar(255) DEFAULT NULL,
  `payment_method_2` varchar(50) DEFAULT NULL,
  `payment_timing_2` datetime DEFAULT NULL,
  `deposited_2` decimal(10,3) DEFAULT NULL,
  `payment_method_3` varchar(50) DEFAULT NULL,
  `payment_timing_3` datetime DEFAULT NULL,
  `deposited_3` decimal(10,3) DEFAULT NULL,
  `Note_payment` varchar(100) DEFAULT NULL,
  `VAT_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `staff_name`, `designer`, `customer_name`, `phone_no`, `product_details`, `product_name`, `product_width`, `product_length`, `quantity`, `price`, `total_price`, `vat`, `payment_method`, `payment_timing`, `delivery_method`, `discount`, `amount_to_pay`, `deposited`, `note`, `created_at`, `status`, `delivery_company`, `delivery_fee`, `delivery_address`, `payment_method_2`, `payment_timing_2`, `deposited_2`, `payment_method_3`, `payment_timing_3`, `deposited_3`, `Note_payment`, `VAT_number`) VALUES
(89, 'John Doe', 'Designer X', 'Customer Y', '1234567890', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":100,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Credit Card', '0000-00-00 00:00:00', 'Delivery', 0.000, 100.000, 0.000, 'Test note', '2024-08-07 19:33:16', '', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(95, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":3850,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '', 0.000, 0.000, 0.000, '', '2024-08-08 04:42:57', 'completed', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(96, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"},{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":300,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '', 0.000, 0.000, 0.000, '', '2024-08-12 05:07:58', '', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(97, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '', 0.000, 125.000, 0.000, '', '2024-08-12 08:16:48', '', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(98, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '0000-00-00 00:00:00', '', 12.000, 125.000, 0.000, '', '2024-08-12 08:16:55', '', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(99, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'transaction', '0000-00-00 00:00:00', 'pickup', 20.000, 105.000, 0.000, '', '2024-08-12 10:02:21', '', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(100, 'Anh', 'anh', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '0000-00-00 00:00:00', 'delivery', 0.000, 125.000, 0.000, 'Npte', '2024-08-12 10:29:49', 'Completed', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(106, 'Anh', 'anh', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '0000-00-00 00:00:00', 'pickup', 0.000, 113.000, 60.000, 'note', '2024-08-13 18:48:18', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(107, '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-15 00:00:00', 'delivery', 0.000, 0.000, 12.000, '', '2024-08-14 17:27:08', NULL, 'grab', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(108, 'Anh', 'anh', 'Tâm', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-16 00:00:00', 'pickup', 12.000, 101.000, 12.000, 'Npte', '2024-08-14 19:19:15', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(109, 'Anh', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":125,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'transaction', '2024-08-16 00:00:00', 'pickup', 2.000, 111.000, 12.000, 'note', '2024-08-16 02:29:19', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(110, 'Mai', 'Hoang', 'Lý', '087162534', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":135,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-16 00:00:00', 'pickup', 5.000, 118.000, 12.000, 'note', '2024-08-16 08:36:58', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(111, 'moh', 'Hoang', 'Tâm', '0978123', '[{\"productName\":\"DECAL 2 mặt\",\"productSpecification\":\"Có bế\",\"totalMoney\":815,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-17 00:00:00', 'delivery', 20.000, 765.000, 30.000, 'Npte', '2024-08-16 17:15:42', NULL, 'Grab', 20.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(113, 'Mai', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":1100,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-17 00:00:00', 'delivery', 0.000, 1100.000, 100.000, 'note', '2024-08-16 18:04:50', NULL, 'Grab', 20.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(114, 'Mai', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem\",\"productSpecification\":\"Chừa biên\",\"totalMoney\":1100,\"note\":\"\"}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-17 00:00:00', 'delivery', 0.000, 1100.000, 100.000, 'note', '2024-08-16 18:06:45', NULL, 'Grab', 20.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(115, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125},{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-29 00:00:00', 'delivery', 10.000, 150.000, 120.000, 'note', '2024-08-27 03:18:24', NULL, 'Grab', 30.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(116, '', '', '', '', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125},{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'cash', '2024-08-29 00:00:00', 'delivery', 10.000, 150.000, 120.000, 'note', '2024-08-27 03:18:29', NULL, 'Grab', 30.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(117, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-08-30 05:14:06', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(118, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-08-30 14:08:28', 'Delivery', 120.000, 810.000, 120.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(119, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 02:23:15', 'Delivery', 120.000, 810.000, 120.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(120, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 02:31:55', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(121, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 02:39:25', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(122, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 02:39:56', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(123, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 02:42:05', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(124, 'Jane Smith', 'N/A', 'Anh Hoai', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:04:47', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(125, 'Jane Smith', 'N/A', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:04:52', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(126, 'Jane Smith', 'Hoang', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:09:12', 'Delivery', 0.000, 810.000, 12.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(127, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:12:43', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(128, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:14:00', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(129, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:14:13', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(130, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:15:20', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(131, 'Jane Smith', 'hello', 'Tâm', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:17:35', 'Delivery', 12.000, 810.000, 12.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(132, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:19:13', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(133, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:20:49', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(134, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:22:37', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(135, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:24:53', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(136, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:26:32', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(137, 'Jane Smith', 'N/A', 'N/A', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:29:06', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(138, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:30:36', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(139, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:31:15', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(140, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:31:52', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(141, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:32:10', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(142, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:33:45', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(143, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:35:04', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(144, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:36:46', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(145, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:38:00', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(146, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:39:33', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(147, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:40:21', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(148, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:42:04', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(149, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:43:30', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(150, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:44:42', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(151, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:45:19', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(152, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:45:53', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(153, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 07:58:14', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(154, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 08:11:07', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(155, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 09:00:15', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(156, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-02 09:00:49', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(157, 'Jane Smith', 'Hoang', 'Tâm', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 06:18:37', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(158, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 15:45:22', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(159, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 17:02:29', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(160, '', 'Hoang', 'Tâm', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 17:09:13', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-03 17:09:13', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(161, 'Jane Smith', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\", ...}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 17:21:24', 'Delivery', 0.000, 810.000, 0.000, '', '2024-08-30 07:08:28', NULL, '', 120.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(162, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-03 17:46:26', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-03 17:46:26', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(163, 'Anne Truong ', 'Thanh', 'Anh Hoai', '12345678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":300},{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"3\",\"length\":\"2\",\"quantity\":\"1\",\"price\":350,\"totalMoney\":2100}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-04 06:32:40', 'Delivery', 0.000, 2592.000, 120.000, '', '2024-09-04 06:32:40', NULL, 'Grab', 25.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(164, 'mohnish gupta', 'Hoang', 'Anh Hoai', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 04:34:28', 'Delivery', 0.000, 135.000, 12.000, '', '2024-09-06 04:34:28', NULL, 'Grab', 12.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(165, 'mohnish gupta', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 04:39:09', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-06 04:39:09', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(166, 'mohnish gupta', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 04:40:34', 'Delivery', 0.000, 300.000, 0.000, '', '2024-09-06 04:40:34', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(167, 'mohnish gupta', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125},{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"3\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":300}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 04:40:39', 'Delivery', 0.000, 425.000, 0.000, '', '2024-09-06 04:40:39', NULL, '', 0.00, '', 'Chuyển khoản ACB', '2024-09-10 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(168, 'Anne Truong ', 'Hoang', 'Tâm', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":350,\"totalMoney\":815}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 17:09:20', 'Delivery', 120.000, 880.200, 120.000, '', '2024-09-06 17:09:20', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(169, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":\"1\",\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 17:11:46', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-06 17:11:46', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(170, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Cash', '2024-09-06 17:34:57', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-06 17:34:57', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(171, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 0.000, 0.000, 0.000, 'Cash', '2024-09-06 17:45:13', 'Delivery', 0.000, 125.000, 0.000, '', '2024-09-06 17:45:13', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(172, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 0.000, 0.000, 0.000, 'Cash', '2024-09-06 17:47:31', 'Delivery', 0.000, 750.000, 0.000, '', '2024-09-06 17:47:31', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(173, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-06 17:48:43', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-06 17:48:43', NULL, '', 0.00, '', 'transaction', '2024-09-10 00:00:00', 12.000, NULL, NULL, NULL, '', NULL),
(174, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125},{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"5\",\"length\":\"4\",\"quantity\":1,\"price\":50,\"totalMoney\":1100}]', NULL, NULL, NULL, NULL, 1225.000, 1323.000, 98.000, 'Cash', '2024-09-06 17:49:33', 'Delivery', 0.000, 1323.000, 0.000, '', '2024-09-06 17:49:33', NULL, '', 0.00, '', 'transaction', '2024-09-18 00:00:00', 12.000, 'transaction', '2024-09-17 00:00:00', 45.000, '', NULL),
(175, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-07 16:15:02', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-07 16:15:02', NULL, '', 0.00, '', 'transaction', '2024-09-10 00:00:00', 23.000, 'transaction', '2024-09-09 00:00:00', 23.000, '', NULL),
(176, 'Anne Truong ', 'Hoang', 'Quynh Anh ', '091687234', '[{\"productName\":\"DECAL Sữa: mực dầu - Có bế, cán keo định hình\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', NULL, NULL, NULL, NULL, 880.200, 950.616, 70.416, 'Cash', '2024-09-10 04:41:33', 'Delivery', 0.000, 950.616, 120.000, '', '2024-09-10 04:41:33', NULL, 'Grab', 12.00, '', 'transaction', '2024-09-17 00:00:00', 150.000, 'Chuyển Khoản', '2024-09-16 00:00:00', 150.000, '', NULL),
(177, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-10 06:09:47', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-10 06:09:47', NULL, '', 0.00, '', 'Tiền mặt', '2024-09-11 00:00:00', 120.000, 'Tiền mặt', '2024-09-10 00:00:00', 120.000, '', NULL),
(178, 'Anne Truong ', 'N/A', 'N/A', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 135.000, 145.800, 10.800, 'Cash', '2024-09-10 06:09:59', 'Delivery', 0.000, 145.800, 12.000, '', '2024-09-10 06:09:59', NULL, '', 0.00, '', 'Chuyển khoản ACB', '2024-09-12 00:00:00', 120.000, 'Chuyển khoản ACB', '2024-09-11 00:00:00', 120.000, 'note', NULL),
(179, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-10 06:26:26', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-10 06:26:26', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(180, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-10 06:37:28', 'Delivery', 0.000, 135.000, 120.000, '', '2024-09-10 06:37:28', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL),
(181, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, 'Cash', '2024-09-10 06:37:52', 'Delivery', 0.000, 135.000, 120.000, '', '2024-09-10 06:37:52', NULL, '', 0.00, '', 'Tiền mặt', '2024-09-04 00:00:00', 100.000, 'Tiền mặt', '2024-09-03 00:00:00', 100.280, '', NULL),
(182, 'Anne Truong ', 'Hi', 'Hi', '091671882', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-10 06:59:34', 'Delivery', 0.000, 145.800, 120.000, '', '2024-09-10 06:59:34', NULL, '', 0.00, '', 'Chuyển khoản ACB', '2024-09-18 00:00:00', 10.000, 'Chuyển khoản ACB', '2024-09-17 00:00:00', 10.000, '', NULL),
(183, 'Anne Truong ', 'Hoang', 'Hoai', '0916000', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', NULL, NULL, NULL, NULL, 880.200, 950.616, 70.416, 'Chuyển khoản Vietcombank', '2024-09-10 13:57:47', 'Delivery', 0.000, 950.616, 120.000, '', '2024-09-10 13:57:47', NULL, '', 0.00, '', 'Tiền mặt', '2024-09-10 00:00:00', 120.000, 'Tiền mặt', '2024-09-01 00:00:00', 120.000, '', NULL),
(184, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"PP PP dầu - Không bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":3,\"price\":100,\"totalMoney\":603}]', NULL, NULL, NULL, NULL, 603.000, 651.240, 48.240, '', '2024-09-10 18:20:59', 'Delivery', 0.000, 651.240, 0.000, '', '2024-09-10 18:20:59', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(185, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.8dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":65,\"totalMoney\":165}]', NULL, NULL, NULL, NULL, 165.000, 178.200, 13.200, '', '2024-09-10 18:21:43', 'Delivery', 0.000, 178.200, 0.000, '', '2024-09-10 18:21:43', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(186, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', NULL, NULL, NULL, NULL, 125.000, 135.000, 10.000, '', '2024-09-10 18:27:56', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-10 18:27:56', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(187, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-10 18:30:03', 'Delivery', 0.000, 135.000, 0.000, '', '2024-09-10 18:30:03', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(188, 'Anne Truong ', 'hello', 'Tâm', '3456', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-10 19:00:29', '', 0.000, 145.800, 45.000, '', '2024-09-10 19:00:29', NULL, '', 0.00, '', 'Tiền mặt', '2024-09-12 00:00:00', 12.000, NULL, NULL, NULL, '', NULL),
(189, 'Anne Truong ', 'Hoang', 'Tâm', '091678', '[{\"productName\":\"DECAL Cát mờ- mực dầu - \",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":165,\"totalMoney\":395}]', 'DECAL Cát mờ- mực dầu - ', 2.00, 1.00, 1, 426.600, 460.728, 34.128, 'Chuyển khoản ACB', '2024-09-10 19:05:39', '', 0.000, 460.728, 120.000, '', '2024-09-10 19:05:39', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(190, 'Anne Truong ', 'Hoang', 'Anh Hoai', '3456', '[{\"productName\":\"DECAL Trong: in ngược - Không bế\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":110,\"totalMoney\":660}]', 'DECAL Trong: in ngược - Không bế', 3.00, 2.00, 1, 712.800, 769.824, 57.024, 'Chuyển khoản ACB', '2024-09-10 19:08:38', '', 120.000, 769.824, 120.000, '', '2024-09-10 19:08:38', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(191, 'Anne Truong ', 'Hoang', 'Tâm', '091678', '[{\"productName\":\"HIFLEX Bạt 3.8dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":65,\"totalMoney\":165}]', 'HIFLEX Bạt 3.8dzem - Chừa biên', 2.00, 1.00, 1, 178.200, 192.456, 14.256, 'Chuyển khoản ACB', '2024-09-10 19:21:48', '', 0.000, 192.456, 120.000, '', '2024-09-10 19:21:48', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(192, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-10 19:43:43', '', 0.000, 135.000, 0.000, '', '2024-09-10 19:43:43', NULL, '', 0.00, '', 'Chuyển khoản ACB', '2024-09-12 00:00:00', 120.000, NULL, NULL, NULL, 'note', NULL),
(193, 'Anne Truong ', 'hello', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-11 03:09:04', '', 0.000, 145.800, 50.000, '', '2024-09-11 03:09:04', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(194, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, 'Tiền mặt', '2024-09-11 03:13:47', '', 0.000, 135.000, 50.000, '', '2024-09-11 03:13:47', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(195, 'Anne Truong ', 'Hoang', 'Tâm', '091678', '[{\"productName\":\"DECAL Cát mờ- mực dầu - \",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":165,\"totalMoney\":395}]', 'DECAL Cát mờ- mực dầu - ', 2.00, 1.00, 1, 395.000, 426.600, 31.600, 'Chuyển khoản ACB', '2024-09-11 03:18:14', '', 0.000, 426.600, 100.000, '', '2024-09-11 03:18:14', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(196, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:19:37', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:19:37', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(197, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:23:14', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:23:14', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(198, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:29:35', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:29:35', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(199, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:32:11', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:32:11', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(200, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:34:06', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:34:06', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(201, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 125.000, 135.000, 10.000, '', '2024-09-11 03:35:39', '', 0.000, 135.000, 0.000, '', '2024-09-11 03:35:39', 'Đã huỷ', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(202, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-11 03:37:14', '', 0.000, 145.800, 120.000, '', '2024-09-11 03:37:14', 'Đang thực hiện', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(203, 'Anne Truong ', 'hello', 'Tâm', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-11 03:46:20', '', 0.000, 15.000, 120.000, '', '2024-09-11 03:46:20', 'Hoàn Tất', '', 0.00, '', 'Chuyển khoản ACB', '2024-09-11 00:00:00', 10.000, NULL, NULL, NULL, '', NULL),
(204, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-11 17:21:17', 'delivery', 0.000, 135.000, 0.000, '', '2024-09-11 17:21:17', 'Hoàn Tất', '', 12.00, '365 Lê Qung Dinh', 'Chuyển khoản ACB', '2024-09-12 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(205, 'Anne Truong ', 'Hoang', 'Anh Hoai', '091678', '[{\"productName\":\"DECAL Cát mờ- mực dầu - \",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":165,\"totalMoney\":395}]', 'DECAL Cát mờ- mực dầu - ', 2.00, 1.00, 1, 426.600, 460.728, 34.128, 'Chuyển khoản ACB', '2024-09-11 18:28:20', 'delivery', 0.000, 306.600, 120.000, '', '2024-09-11 18:28:20', 'Hoàn Tất', '', 12.00, '123 HHoàng VĂn thj', 'Chuyển khoản ACB', '2024-09-19 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(206, 'Anne Truong ', 'Hoang', 'Anh Hoai', '091678', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-11 18:37:27', 'delivery', 0.000, 80.000, 55.000, '', '2024-09-11 18:37:27', 'Hoàn Tất', '', 12.00, '365 Lê Qung Dinh', 'Chuyển khoản Vietcombank', '2024-09-12 00:00:00', 20.000, NULL, NULL, NULL, '', NULL),
(207, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-12 04:09:12', 'delivery', 0.000, 135.000, 0.000, '', '2024-09-12 04:09:12', 'Hoàn Tất', '', 12.00, '365 Lê Qung Dinh', 'Chuyển khoản ACB', '2024-09-12 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(208, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-13 14:56:20', '', 0.000, 135.000, 0.000, '', '2024-09-13 14:56:20', 'Hoàn Tất', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(209, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-13 14:57:45', '', 0.000, 135.000, 0.000, '', '2024-09-13 14:57:45', 'Hoàn Tất', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(210, 'Anne Truong ', 'Hoang', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-13 15:25:41', '', 0.000, 135.000, 0.000, '', '2024-09-13 15:25:41', 'Hoàn Tất', '', 0.00, '', 'Chuyển khoản ACB', '2024-09-20 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(211, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-13 17:32:06', '', 0.000, 135.000, 0.000, '', '2024-09-13 17:32:06', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(212, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-13 17:33:32', '', 0.000, 135.000, 0.000, '', '2024-09-13 17:33:32', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(213, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-15 15:58:02', '', 0.000, 135.000, 0.000, '', '2024-09-15 15:58:02', 'Đang thực hiện', '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(214, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-16 15:19:55', '', 0.000, 135.000, 0.000, '', '2024-09-16 15:19:55', 'Hoàn Tất', '', 0.00, '', 'Chuyển khoản ACB', '2024-09-16 00:00:00', 120.000, NULL, NULL, NULL, 'note', NULL),
(215, 'Anne Truong vina', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, 'Chuyển khoản ACB', '2024-09-16 16:14:12', '', 0.000, 690.000, 120.000, '', '2024-09-16 16:14:12', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(216, 'Anne Truong vina', 'Hoang', 'Anh', '09127812', '[{\"productName\":\"DECAL Cát mờ- mực dầu - \",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":165,\"totalMoney\":395}]', 'DECAL Cát mờ- mực dầu - ', 2.00, 1.00, 1, 426.600, 460.728, 34.128, '', '2024-09-16 16:14:39', '', 0.000, 426.600, 0.000, '', '2024-09-16 16:14:39', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(217, 'Anne Truong vina', 'Hoang', 'Anh Hoai', '12345', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, 'Tiền mặt', '2024-09-16 16:15:34', '', 0.000, 690.000, 120.000, '', '2024-09-16 16:15:34', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(218, 'Anne Truong vina', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-16 16:22:54', '', 0.000, 135.000, 0.000, '', '2024-09-16 16:22:54', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(219, 'Anne Truong vina', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, 'Chuyển khoản ACB', '2024-09-16 16:23:06', '', 0.000, 35.000, 100.000, '', '2024-09-16 16:23:06', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(220, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-16 16:35:11', 'pickup', 0.000, 135.000, 0.000, '', '2024-09-16 16:35:11', 'Hoàn Tất', '', 12.00, '365 Lê Qung Dinh', 'Chuyển khoản ACB', '2024-09-17 00:00:00', 120.000, NULL, NULL, NULL, 'note', NULL),
(221, 'Anne Truong vina', 'Hoang', 'Hoai ', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', 'DECAL 2 mặt - Có bế', 2.00, 1.00, 1, 880.200, 950.616, 70.416, 'Tiền mặt', '2024-09-17 02:43:21', 'delivery', 0.000, 760.200, 120.000, '', '2024-09-17 02:43:21', 'Hoàn Tất', '', 20.00, '365 Lê Qung Dinh', 'Tiền mặt', '2024-09-18 00:00:00', 120.000, NULL, NULL, NULL, 'Note', NULL),
(222, 'Anne Truong vina', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', 'DECAL 2 mặt - Có bế', 2.00, 1.00, 1, 880.200, 950.616, 70.416, '', '2024-09-17 16:24:01', '', 0.000, 880.200, 0.000, '', '2024-09-17 16:24:01', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(223, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-17 18:31:57', '', 0.000, 135.000, 0.000, '', '2024-09-17 18:31:57', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(224, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-18 01:47:35', '', 0.000, 135.000, 0.000, '', '2024-09-18 01:47:36', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(225, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Dán nối, Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":60,\"totalMoney\":145}]', 'HIFLEX Bạt 3.2dzem - Dán nối, Chừa biên', 2.00, 1.00, 1, 156.600, 169.128, 12.528, '', '2024-09-18 01:49:53', '', 0.000, 156.600, 0.000, '', '2024-09-18 01:49:53', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(226, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-18 01:50:35', '', 0.000, 135.000, 0.000, '', '2024-09-18 01:50:35', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(227, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 01:54:47', '', 0.000, 324.000, 0.000, '', '2024-09-18 01:54:47', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(228, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-18 01:55:11', '', 0.000, 135.000, 0.000, '', '2024-09-18 01:55:11', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(229, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, '', '2024-09-18 01:57:05', '', 0.000, 810.000, 0.000, '', '2024-09-18 01:57:05', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `customer_order` (`order_id`, `staff_name`, `designer`, `customer_name`, `phone_no`, `product_details`, `product_name`, `product_width`, `product_length`, `quantity`, `price`, `total_price`, `vat`, `payment_method`, `payment_timing`, `delivery_method`, `discount`, `amount_to_pay`, `deposited`, `note`, `created_at`, `status`, `delivery_company`, `delivery_fee`, `delivery_address`, `payment_method_2`, `payment_timing_2`, `deposited_2`, `payment_method_3`, `payment_timing_3`, `deposited_3`, `Note_payment`, `VAT_number`) VALUES
(230, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 01:59:14', '', 0.000, 324.000, 0.000, '', '2024-09-18 01:59:14', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(231, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:01:55', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:01:55', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(232, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:02:32', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:02:32', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(233, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:03:37', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:03:37', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(234, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:03:50', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:03:50', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(235, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:04:45', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:04:45', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(236, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:06:25', 'delivery', 0.000, 324.000, 0.000, '', '2024-09-18 02:06:25', NULL, '', 12.00, '125 Hoàng Văn Thụ ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(237, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:06:42', 'delivery', 0.000, 324.000, 0.000, '', '2024-09-18 02:06:42', NULL, '', 12.00, '125 Hoàng Văn Thụ ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(238, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":50,\"totalMoney\":125}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 2.00, 1.00, 1, 135.000, 145.800, 10.800, '', '2024-09-18 02:07:34', '', 0.000, 135.000, 0.000, '', '2024-09-18 02:07:34', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(239, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, '', '2024-09-18 02:08:17', 'delivery', 0.000, 810.000, 0.000, '', '2024-09-18 02:08:17', NULL, '', 30.00, '125 Hoàng Văn Thụ ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(240, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:09:50', '', 0.000, 324.000, 0.000, '', '2024-09-18 02:09:50', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(241, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, '', '2024-09-18 02:10:25', '', 0.000, 810.000, 0.000, '', '2024-09-18 02:10:25', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(242, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"4\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":750}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 4.00, 3.00, 1, 810.000, 874.800, 64.800, '', '2024-09-18 02:10:47', '', 0.000, 810.000, 0.000, '', '2024-09-18 02:10:47', NULL, '', 0.00, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(243, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:15:08', 'delivery', 0.000, 324.000, 0.000, '', '2024-09-18 02:15:08', NULL, '', 30.00, '125 Hoàng Văn Thụ ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(244, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"3\",\"quantity\":1,\"price\":50,\"totalMoney\":450}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 3.00, 1, 486.000, 524.880, 38.880, '', '2024-09-18 02:16:05', 'delivery', 0.000, 486.000, 0.000, '', '2024-09-18 02:16:05', NULL, '', 25.00, '125 Hoàng Văn Thụ ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(245, 'Anne Truong ', 'N/A', 'N/A', 'N/A', '[{\"productName\":\"HIFLEX Bạt 3.2dzem - Chừa biên\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":50,\"totalMoney\":300}]', 'HIFLEX Bạt 3.2dzem - Chừa biên', 3.00, 2.00, 1, 324.000, 349.920, 25.920, '', '2024-09-18 02:16:39', 'delivery', 0.000, 324.000, 0.000, '', '2024-09-18 02:16:39', 'Đã huỷ', '', 25.00, '125 Hoàng Văn Thụ ', 'Chuyển khoản ACB', '2024-09-18 00:00:00', 120.000, 'Chuyển khoản ACB', '2024-09-17 00:00:00', 140.000, '', NULL),
(246, 'Anne Truong vina', 'Thanh', 'Anh Hoai', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"3\",\"length\":\"2\",\"quantity\":1,\"price\":350,\"totalMoney\":2100}]', 'DECAL 2 mặt - Có bế', 3.00, 2.00, 1, 2268.000, 2449.440, 181.440, 'Chuyển khoản ACB', '2024-09-18 17:27:37', '', 0.000, 2148.000, 120.000, '', '2024-09-18 17:27:37', NULL, '', 0.00, '', 'Chuyển khoản ACB', '2024-09-26 00:00:00', 120.000, 'Chuyển khoản ACB', '2024-09-25 00:00:00', 120.000, '', NULL),
(247, 'Anne Truong vina', 'Thanh', 'Anh Hoai', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', 'DECAL 2 mặt - Có bế', 2.00, 1.00, 1, 880.200, 950.616, 70.416, 'Chuyển khoản ACB', '2024-09-18 17:34:45', 'delivery', 0.000, 760.200, 120.000, '', '2024-09-18 17:34:45', NULL, '', 25.00, '125 Hoàng Văn Thụ ', 'Chuyển khoản ACB', '2024-09-19 00:00:00', 120.000, NULL, NULL, NULL, '', NULL),
(248, 'Anne Truong vina', 'Thanh', 'Anh Hoai', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', 'DECAL 2 mặt - Có bế', 2.00, 1.00, 1, 880.200, 950.616, 70.416, 'Chuyển khoản ACB', '2024-09-18 17:50:23', 'delivery', 0.000, 760.200, 120.000, '', '2024-09-18 17:50:23', NULL, '', 25.00, '125 Hoàng Văn Thụ ', 'Chuyển khoản ACB', '2024-09-20 00:00:00', 120.000, 'Chuyển khoản ACB', '2024-09-20 00:00:00', 230.000, '', NULL),
(249, 'Anne Truong vina', 'Thanh', 'Anh Hoai', '091678', '[{\"productName\":\"DECAL 2 mặt - Có bế\",\"width\":\"2\",\"length\":\"1\",\"quantity\":1,\"price\":350,\"totalMoney\":815}]', 'DECAL 2 mặt - Có bế', 2.00, 1.00, 1, 880.200, 950.616, 70.416, 'Chuyển khoản ACB', '2024-09-18 17:54:17', 'delivery', 0.000, 760.200, 120.000, '', '2024-09-18 17:54:17', 'Đang thực hiện', '', 12.00, '125 Hoàng Văn Thụ ', 'Chuyển khoản ACB', '2024-09-19 00:00:00', 120.000, 'Chuyển khoản ACB', '2024-09-20 00:00:00', 300.000, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_payments`
--

CREATE TABLE `order_payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `payment_timing` datetime NOT NULL,
  `deposited` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_payments`
--

INSERT INTO `order_payments` (`payment_id`, `order_id`, `payment_method`, `payment_timing`, `deposited`) VALUES
(2, 107, 'credit card', '2024-08-15 10:00:00', 150.00);

-- --------------------------------------------------------

--
-- Table structure for table `pricefull`
--

CREATE TABLE `pricefull` (
  `product_id` int(11) NOT NULL,
  `calculation_methods` varchar(16) DEFAULT NULL,
  `product_name` varchar(21) DEFAULT NULL,
  `product_specification` varchar(62) DEFAULT NULL,
  `price_perm2` varchar(3) DEFAULT NULL,
  `price_per_unit` varchar(4) DEFAULT NULL,
  `extra_supply` varchar(3) DEFAULT NULL,
  `whole-sale` varchar(10) DEFAULT NULL,
  `max_side` int(10) DEFAULT NULL,
  `quantity frame` varchar(9) DEFAULT NULL,
  `Note` varchar(53) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `pricefull`
--

INSERT INTO `pricefull` (`product_id`, `calculation_methods`, `product_name`, `product_specification`, `price_perm2`, `price_per_unit`, `extra_supply`, `whole-sale`, `max_side`, `quantity frame`, `Note`) VALUES
(1, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Chừa biên', '50', '', '25', 'undefined', 3, 'undefined', 'undefined'),
(2, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Đóng Khoen', '55', '', '25', '45', 3, '', ''),
(3, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Dán nối, Chừa biên', '60', '', '25', '50', 3, '', ''),
(4, 'SP tính theo m', 'HIFLEX Bạt 3.2dzem', 'Dán nối, đóng khoen', '65', '', '25', '50', 3, '', ''),
(5, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Chừa biên', '55', '', '30', '50', 3, '', ''),
(6, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Đóng Khoen', '60', '', '30', '55', 3, '', ''),
(7, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Dán nối, Chừa biên', '65', '', '30', '60', 3, '', ''),
(8, 'SP tính theo m', 'HIFLEX Bạt 3.6dzem', 'Dán nối, đóng khoen', '70', '', '30', '60', 3, '', ''),
(9, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Chừa biên', '65', '', '35', '50', 3, '', ''),
(10, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Đóng Khoen', '70', '', '35', '55', 3, '', ''),
(11, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Dán nối, Chừa biên', '75', '', '35', '60', 3, '', ''),
(12, 'SP tính theo m', 'HIFLEX Bạt 3.8dzem', 'Dán nối, đóng khoen', '80', '', '35', '60', 0, '', ''),
(13, 'SP tính theo m', 'PP PP dầu', 'Không bế', '100', '', '0', '70', 0, '', ''),
(14, 'SP tính theo m', 'PP PP dầu', 'Có bế', '140', '', '0', '110', 0, '', ''),
(15, 'SP tính theo m', 'DECAL Sữa/Trong Dầu', 'Không bế', '100', '', '65', 'undefined', 0, 'undefined', 'undefined'),
(16, 'SP tính theo m', 'DECAL Sữa/Trong Dầu', 'Có bế', '150', '', '115', '90', 0, '', ''),
(17, 'SP tính theo m', 'DECAL Trong: in ngược', 'Không bế', '110', '', '65', '90', 0, '', ''),
(18, 'SP tính theo m', 'DECAL Trong: in ngược', 'Có bế', '130', '', '115', '90', 0, '', ''),
(19, 'SP tính theo m', 'DECAL Trong: in ngược', 'Cán lên decal sữa không bế', '185', '', '65', '90', 0, '', ''),
(20, 'SP tính theo m', 'DECAL Trong: in ngược', 'Cán lên decal sữa có bế', '250', '', '65', '90', 0, '', ''),
(21, 'SP tính theo m', 'DECAL Cát mờ- mực dầu', '', '165', '', '65', '90', 0, '', ''),
(22, 'SP tính theo m', 'DECAL 2 mặt', 'Có bế', '350', '', '115', '90', 0, '', ''),
(23, 'SP tính theo m', 'DECAL Sữa: mực dầu', 'Có bế, cán keo định hình', '350', '', '115', '90', 0, '', ''),
(24, 'SP tính theo m', 'DECAL Màu', 'Có bế, cán keo định hình', '250', '', '', '', 0, '', ''),
(25, 'SP tính theo m', 'CANVAS Mờ', 'Dầu/Silk (<147cm)', '150', '', '', '', 0, '', ''),
(26, 'SP tính theo m', 'CANVAS Bóng', 'Dầu/Silk (<147cm)', '150', '', '', '', 0, '', ''),
(27, 'SP tính theo m', 'CANVAS Dầu', 'Khổ lớn 3m', '185', '', '', '', 0, '', ''),
(28, 'SP tính theo m', 'Giấy Ảnh Dầu', '', '150', '', '', '', 0, '', ''),
(29, 'SP tính theo m', 'Baclitfilm Dầu', 'ko quy cách', '150', '', '', '', 0, '', ''),
(30, 'SP tính theo m', 'Baclitfilm Dầu', 'cán kéo', '200', '', '', '', 0, '', ''),
(31, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '200', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(32, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '250', '', '', 0, '10 hộp', 'có hàng 5-7 ngày'),
(33, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '500', '', '', 0, '20 hộp', 'có hàng 5-7 ngày'),
(34, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '1000', '', '', 0, '40 hộp', 'có hàng 5-7 ngày'),
(35, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '1500', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(36, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ 2 mặt', '', '2500', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(37, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '120', '', '', 0, '1-4 hộp', ''),
(38, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '110', '', '', 0, '5 hộp', ''),
(39, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '100', '', '', 0, '8 hộp', ''),
(40, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '95', '', '', 0, '10 hộp', ''),
(41, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '90', '', '', 0, '15 hộp ', ''),
(42, 'SP tính theo món', 'NAMECARD KTS', 'C300gsm in, cán mờ 2 mặt', '', '85', '', '', 0, '20 hộp', ''),
(43, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '320', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(44, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '190', '', '', 0, '10 hộp', 'có hàng 5-7 ngày'),
(45, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '136', '', '', 0, '20 hộp', 'có hàng 5-7 ngày'),
(46, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '135', '', '', 0, '40 hộp ', 'có hàng 5-7 ngày'),
(47, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '130', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(48, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 2 mặt', '', '75', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(49, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '220', '', '', 0, '5 hộp', 'có hàng 5-7 ngày'),
(50, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '120', '', '', 0, '10 hộp ', 'có hàng 5-7 ngày'),
(51, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '110', '', '', 0, '20 hộp ', 'có hàng 5-7 ngày'),
(52, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '100', '', '', 0, '40 hộp', 'có hàng 5-7 ngày'),
(53, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '90', '', '', 0, '60 hộp', 'có hàng 5-7 ngày'),
(54, 'SP tính theo món', 'NAMECARD Offset', 'C300gsm in, cán mờ, ép kim 1 mặt', '', '60', '', '', 0, '100 hộp', 'có hàng 5-7 ngày'),
(55, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '160', '', '', 0, '1-4 hộp', ''),
(56, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '150', '', '', 0, '5 hộp', ''),
(57, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '140', '', '', 0, '8 hộp', ''),
(58, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '130', '', '', 0, '10 hộp', ''),
(59, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '120', '', '', 0, '15 hộp ', ''),
(60, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 250gsm, in 2 mặt , không màng', '', '110', '', '', 0, '20 hộp', ''),
(61, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '200', '', '', 0, '1-4 hộp', ''),
(62, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '190', '', '', 0, '5 hộp', ''),
(63, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '180', '', '', 0, '8 hộp', ''),
(64, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '170', '', '', 0, '10 hộp', ''),
(65, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '160', '', '', 0, '15 hộp ', ''),
(66, 'SP tính theo món', 'NAMECARD KTS', 'Giấy mĩ thuật 300gsm, in 2 mặt , không màng', '', '150', '', '', 0, '20 hộp', ''),
(67, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '700', '', '', 0, '1000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(68, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1200', '', '', 0, '2000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(69, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1400', '', '', 0, '3000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(70, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2100', '', '', 0, '5000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(71, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo HCN: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '3400', '', '', 0, '10000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(72, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1300', '', '', 0, '1000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(73, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '1600', '', '', 0, '2000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(74, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2000', '', '', 0, '3000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(75, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '2700', '', '', 0, '5000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(76, 'SP tính theo món', 'NAMECARD Offset', 'Tem treo Bế: giấy C300gsm, in 2 mặt, không màng, cán mờ 2 mặt', '', '4000', '', '', 0, '10000 tag', 'đục lỗ 3 li hoặc 5 li, 8.8cm x 5.3cm, có hàng 7 ngày '),
(77, NULL, 'PP', 'dai rong', '12', '', '12', '11', NULL, '2', 'Note'),
(78, NULL, 'Sp Test mơi', '', '30', '', '', '', NULL, '', ''),
(79, NULL, 'Test Product ', '', '55', '', '', '', NULL, '', 'Note'),
(80, NULL, 'Test Product 2', '', '55', '', '', '', NULL, '', ''),
(81, NULL, 'Test Product 3', 'Be ', '', '55', '22', '', NULL, '', 'note '),
(82, NULL, 'Test Product 4', '', '130', '', '', '100', NULL, '', 'Note ');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('e8muNyIU7Ci7Xnup4zc5ClgZ7-Fo-C7O', 1726824732, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2024-09-16T15:57:13.402Z\",\"httpOnly\":true,\"path\":\"/\"},\"userEmail\":\"anne@vinadesign.vn\"}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_no` varchar(12) DEFAULT NULL,
  `position` varchar(255) NOT NULL,
  `date_joining` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `performance_rating` int(1) DEFAULT 0 COMMENT 'Performance rating from 1 to 5',
  `attitude_rating` int(1) DEFAULT 0 COMMENT 'Attitude rating from 1 to 5',
  `strengths` text DEFAULT NULL COMMENT 'Feedback on strengths',
  `weaknesses` text DEFAULT NULL COMMENT 'Feedback on weaknesses'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `fullname`, `email`, `password`, `phone_no`, `position`, `date_joining`, `address`, `performance_rating`, `attitude_rating`, `strengths`, `weaknesses`) VALUES
(1, 'Anne Truong ', 's3978161@rmit.edu.vn', '$2b$10$MqbxYlTysilcCcX/hl3qpeTAKkrABRFD0V.lGkDiHcSLwg1Lh8l62', '917232367', 'Kinh Doanh ', '2024-08-07', '133 Hoang Ha ', 4, 4, 'Strength', 'Weakness '),
(2, 'Anne Truong vina', 'anne@vinadesign.vn', '$2b$10$.YIgPwH1UYAeXwPUsl4NH.GqWeqaKMHfpnZQgABfBUjKD9Jz5YciO', '123456789', '', '0000-00-00', '', 3, 4, 'ok ', 'ôn. '),
(3, 'Quynh Anh', 'annetruongquynhanh@gmail.com', '$2b$10$X9vaetPZ1DER5PzP5NUo0OG4fsbPmB6SeeLwKYjnsp6zvpv/HIHiK', NULL, '', '0000-00-00', '', 4, 4, 'Great ', 'Weakness '),
(4, 'mohnish gupta', 'mohnish@gmail.com', '$2b$10$yEdwgw9.1KYFWUZR6yXGQ.vAtIkjSgv7xnH1xi.bkJNh5Rm8Ulic6', '34567890', '', '0000-00-00', '', 0, 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cart_items_table`
--
ALTER TABLE `Cart_items_table`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `congno`
--
ALTER TABLE `congno`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `customer_order`
--
ALTER TABLE `customer_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_payments`
--
ALTER TABLE `order_payments`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk_order` (`order_id`);

--
-- Indexes for table `pricefull`
--
ALTER TABLE `pricefull`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cart_items_table`
--
ALTER TABLE `Cart_items_table`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `congno`
--
ALTER TABLE `congno`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=250;

--
-- AUTO_INCREMENT for table `order_payments`
--
ALTER TABLE `order_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pricefull`
--
ALTER TABLE `pricefull`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_payments`
--
ALTER TABLE `order_payments`
  ADD CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
