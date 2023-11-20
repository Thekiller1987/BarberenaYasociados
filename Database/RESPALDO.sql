-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: abogados_firma
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `abogados`
--

DROP TABLE IF EXISTS `abogados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `abogados` (
  `id_abogado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  `area_especializacion` varchar(45) NOT NULL,
  `correo_electronico` varchar(45) NOT NULL,
  `num_carnet` varchar(45) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `genero` varchar(45) DEFAULT NULL,
  `direccion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `imagen` longtext,
  PRIMARY KEY (`id_abogado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abogados`
--

LOCK TABLES `abogados` WRITE;
/*!40000 ALTER TABLE `abogados` DISABLE KEYS */;
INSERT INTO `abogados` VALUES (2,'oreki Houtaru','montenegro melgara','papeleria','montenegrobrayan@gmail.com','220511','2005-05-11','Masculino','mym 3 cuadras y media al oeste','88379671','data:image/jpeg;base64,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'),(3,'yamil','martinez','murto','correoew@cliente.com','256356','2000-11-20','Femenino','mym 3 cuadras y media al oeste','85159655','');
/*!40000 ALTER TABLE `abogados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `archivos`
--

DROP TABLE IF EXISTS `archivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `archivos` (
  `id_archivo` int NOT NULL AUTO_INCREMENT,
  `nombre_archivo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `tipo_archivo` varchar(45) NOT NULL,
  `fecha_de_carga` datetime NOT NULL,
  `ruta_de_archivo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_archivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `archivos`
--

LOCK TABLES `archivos` WRITE;
/*!40000 ALTER TABLE `archivos` DISABLE KEYS */;
/*!40000 ALTER TABLE `archivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bitacora`
--

DROP TABLE IF EXISTS `bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacora` (
  `id_bitacora` int NOT NULL AUTO_INCREMENT,
  `transaccion` varchar(10) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `fecha` datetime NOT NULL,
  `tabla` varchar(20) NOT NULL,
  PRIMARY KEY (`id_bitacora`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacora`
--

LOCK TABLES `bitacora` WRITE;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `casos`
--

DROP TABLE IF EXISTS `casos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `casos` (
  `idCasos` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_finalizacion` date DEFAULT NULL,
  `costo_servicio` decimal(10,0) NOT NULL,
  `abogados_id_abogado` int NOT NULL,
  `clientes_id_clientes` int NOT NULL,
  `estado` enum('Abierto','En proceso','Cerrado') DEFAULT NULL,
  PRIMARY KEY (`idCasos`),
  KEY `abogados_id_abogado` (`abogados_id_abogado`),
  KEY `clientes_id_clientes` (`clientes_id_clientes`),
  CONSTRAINT `casos_ibfk_1` FOREIGN KEY (`abogados_id_abogado`) REFERENCES `abogados` (`id_abogado`),
  CONSTRAINT `casos_ibfk_2` FOREIGN KEY (`clientes_id_clientes`) REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `casos`
--

LOCK TABLES `casos` WRITE;
/*!40000 ALTER TABLE `casos` DISABLE KEYS */;
INSERT INTO `casos` VALUES (4,'Eliab peticion de divorcio','2023-12-08','2023-12-21',5,2,2,'Cerrado'),(5,'divorcio ','2023-11-14','2023-11-18',500,2,5,'En proceso'),(6,'mario divorcio','2023-11-14','2023-11-17',5000,3,5,'En proceso'),(7,'divorcio de Oscar','2023-11-09','2023-11-17',5000,2,11,'En proceso'),(10,'divorcio de waskar con vienes mal comunados ','2023-11-16','2023-11-23',5000,3,6,'En proceso'),(11,'divorcio de waskar con vienes mal comunados ','2023-11-16','2023-11-23',5000,3,6,'En proceso'),(12,'divorcio de vienes mancomunados con custodia de los hijos para la madre','2023-11-16','2023-11-23',5000,3,4,'En proceso');
/*!40000 ALTER TABLE `casos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `idClientes` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  PRIMARY KEY (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'NuevoNombreClienterox33333','nuevo@correo.com','55651245'),(2,'jose','montenegrobrayan@gmail.com','88379671'),(4,'maria','correo1@gmail.com','55651245'),(5,'mario','correo1@gmail.com','55662233'),(6,'jose ','correoew@cliente.com','55651245'),(7,'jose ','hkjhfsjdh@gmail.com','55651245'),(8,'jose maria moreno castro','jose@gmail.com','88379671'),(10,'Brayan','montenegrobrayan@gmail.com','2251511212'),(11,'Oscar Morales','correo1@cliente.com','85562562');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonio`
--

DROP TABLE IF EXISTS `testimonio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonio` (
  `id_testimonio` int NOT NULL AUTO_INCREMENT,
  `fecha_testimonio` date NOT NULL,
  `puntuacion` int NOT NULL,
  `testimonio` varchar(100) NOT NULL,
  `idClientes` int DEFAULT NULL,
  PRIMARY KEY (`id_testimonio`),
  KEY `idClientes` (`idClientes`),
  CONSTRAINT `testimonio_ibfk_1` FOREIGN KEY (`idClientes`) REFERENCES `clientes` (`idClientes`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonio`
--

LOCK TABLES `testimonio` WRITE;
/*!40000 ALTER TABLE `testimonio` DISABLE KEYS */;
INSERT INTO `testimonio` VALUES (1,'2023-11-19',4,'muy bueno',4);
/*!40000 ALTER TABLE `testimonio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_Usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_Usuario` varchar(30) NOT NULL,
  `contrasena` varchar(16) NOT NULL,
  `rol` varchar(20) NOT NULL,
  PRIMARY KEY (`id_Usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Oreki','0524','admin'),(2,'javi','0524','cliente');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'abogados_firma'
--

--
-- Dumping routines for database 'abogados_firma'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-19 21:07:29
