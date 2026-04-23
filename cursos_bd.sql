
CREATE DATABASE gestion_cursos;


CREATE TABLE profesores (
    id_profesor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    especialidad VARCHAR(100)
);


CREATE TABLE estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_nacimiento DATE
);


CREATE TABLE cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creditos INT,
    id_profesor INT REFERENCES profesores(id_profesor)
);


CREATE TABLE horarios (
    id_horario SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso),
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    aula VARCHAR(20)
);


CREATE TABLE matriculas (
    id_matricula SERIAL PRIMARY KEY,
    id_estudiante INT REFERENCES estudiantes(id_estudiante),
    id_curso INT REFERENCES cursos(id_curso),
    fecha_matricula DATE DEFAULT CURRENT_DATE,
    estado VARCHAR(20) DEFAULT 'activo'
);


INSERT INTO profesores (nombre, apellido, email, especialidad) VALUES
('Juan', 'Pérez', 'juan.perez@ejemplo.com', 'Matemáticas'),
('Ana', 'Gómez', 'ana.gomez@ejemplo.com', 'Ciencias');

INSERT INTO estudiantes (nombre, apellido, email, fecha_nacimiento) VALUES
('Carlos', 'López', 'carlos.lopez@ejemplo.com', '2000-05-15'),
('María', 'Martínez', 'maria.martinez@ejemplo.com', '1999-11-22');

INSERT INTO cursos (nombre, descripcion, creditos, id_profesor) VALUES
('Álgebra', 'Curso de álgebra básica', 4, 1),
('Biología', 'Introducción a la biología', 3, 2);

INSERT INTO horarios (id_curso, dia_semana, hora_inicio, hora_fin, aula) VALUES
(1, 'Lunes', '08:00:00', '10:00:00', 'A101'),
(2, 'Miércoles', '10:00:00', '12:00:00', 'B202');

INSERT INTO matriculas (id_estudiante, id_curso) VALUES
(1, 1),
(2, 2);
