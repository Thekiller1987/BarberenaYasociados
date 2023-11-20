
CREATE TABLE clientes (
	idClientes INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);

-- Crea la tabla `usuarios`
CREATE TABLE Usuario (
  id_Usuario Int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_Usuario Varchar(30) NOT NULL,
  contrasena Varchar(16) NOT NULL,
  rol Varchar(20) NOT NULL
);

-- Crea la tabla `abogados`
CREATE TABLE abogados (
  id_abogado INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellidos VARCHAR(45) NOT NULL,
  area_especializacion VARCHAR(45) NOT NULL,
  correo_electronico VARCHAR(45) NOT NULL,
  num_carnet VARCHAR(45) NOT NULL,
  fecha_nacimiento date NOT NULL,
  genero varchar(45) NOT NULL,
  direccion varchar(255) NOT NULL,
  telefono varchar(10) NOT NULL,
  imagen longtext
);


-- Crea la tabla `casos`
CREATE TABLE casos (
  idCasos INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  descripcion VARCHAR(100) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_finalizacion DATE,
  costo_servicio DECIMAL NOT NULL,
  abogados_id_abogado INT NOT NULL,
  clientes_id_clientes INT NOT NULL,
  estado ENUM('Abierto', 'En proceso', 'Cerrado'),
  FOREIGN KEY (abogados_id_abogado) REFERENCES abogados (id_abogado),
  FOREIGN KEY (clientes_id_clientes) REFERENCES clientes (idClientes)
);

-- Crea la tabla `archivos`
CREATE TABLE archivos (
  id_archivo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre_archivo NVARCHAR(255) NOT NULL,
  tipo_archivo VARCHAR(45) NOT NULL,
  fecha_de_carga DATETIME NOT NULL,
  ruta_de_archivo VARCHAR(255) NOT NULL
);

CREATE TABLE Testimonio (
    id_testimonio INT AUTO_INCREMENT PRIMARY KEY,
    fecha_testimonio DATE NOT NULL,
    puntuacion INT NOT NULL,
    testimonio VARCHAR(100) NOT NULL,
    idClientes INT,
    FOREIGN KEY (idClientes) REFERENCES clientes(idClientes)
);

CREATE TABLE bitacora (
  id_bitacora INT NOT NULL AUTO_INCREMENT,
  transaccion VARCHAR(10) NOT NULL,
  usuario VARCHAR(40) NOT NULL,
  fecha DATETIME NOT NULL,
  tabla VARCHAR(20) NOT NULL,
  PRIMARY KEY (id_bitacora)
);

use abogados_firma;

