const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion_cursos',
  password: 'tu_contraseña',
  port: 5432,
});

module.exports = pool;

app.get('/api/cursos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cursos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cursos' });
  }
});

app.get('/api/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM cursos WHERE id_curso = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' });
  }
});

app.post('/api/cursos', async (req, res) => {
  try {
    const { nombre, descripcion, creditos, id_profesor } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO cursos (nombre, descripcion, creditos, id_profesor) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, creditos, id_profesor]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el curso' });
  }
});

app.put('/api/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, creditos, id_profesor } = req.body;
    const { rows } = await pool.query(
      'UPDATE cursos SET nombre = $1, descripcion = $2, creditos = $3, id_profesor = $4 WHERE id_curso = $5 RETURNING *',
      [nombre, descripcion, creditos, id_profesor, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' });
  }
});

app.delete('/api/cursos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM cursos WHERE id_curso = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => {
  console.log(`Servidor en http://localhost:3000`);
});