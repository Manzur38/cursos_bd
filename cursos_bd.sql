create table profesores (
    id_profesor SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    especialidad VARCHAR(100)
);

create table estudiantes (
    id_estudiante SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    fecha_nacimiento DATE 
);

create table cursos (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    description TEXT,
    creditos INT,
    id_profesor INT REFERENCES profesores(id_profesor) 
);

create table horarios (
    id_horario SERIAL PRIMARY KEY,
    id_curso INT REFERENCES cursos(id_curso),
    dia_semana VARCHAR(20) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
	aula VARCHAR(20)
);

create table matricula (
    id_matricula SERIAL PRIMARY KEY,
	id_estudiante INT REFERENCES estudiantes(id_estudiante),
	id_curso INT REFERENCES cursos (id_curso),
	fecha_matricula DATE DEFAULT CURRENT_DATE,
	estado VARCHAR(20) DEFAULT 'activo'
);

