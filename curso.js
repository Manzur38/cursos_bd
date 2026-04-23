const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion_cursos',
  password: 'tu_contraseña',
  port: 5432,
});

const getCursos = async () => {
  const { rows } = await pool.query('SELECT * FROM cursos');
  return rows;
};

const getCursoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM cursos WHERE id_curso = $1', [id]);
  return rows[0];
};

const crearCurso = async (curso) => {
  const { nombre, descripcion, creditos, id_profesor } = curso;
  const { rows } = await pool.query(
    'INSERT INTO cursos (nombre, descripcion, creditos, id_profesor) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, descripcion, creditos, id_profesor]
  );
  return rows[0];
};

const actualizarCurso = async (id, curso) => {
  const { nombre, descripcion, creditos, id_profesor } = curso;
  const { rows } = await pool.query(
    'UPDATE cursos SET nombre = $1, descripcion = $2, creditos = $3, id_profesor = $4 WHERE id_curso = $5 RETURNING *',
    [nombre, descripcion, creditos, id_profesor, id]
  );
  return rows[0];
};

const eliminarCurso = async (id) => {
  const { rows } = await pool.query('DELETE FROM cursos WHERE id_curso = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getCursos,
  getCursoById,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
};

