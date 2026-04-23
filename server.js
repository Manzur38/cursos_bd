const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cursos_bd',
  password: '12345678',
  port: 5432,
});

module.exports = pool;

app.get('/', async (req, res) => {
  try {
    res.json({mensaje: "Api funcionando correctamente"});
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el api' });
  }
});

app.get('/cursos', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM cursos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar cursos' });
  }
});

app.get('/cursos/:id', async (req, res) => {
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

app.post('/cursos', async (req, res) => {
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

app.put('/cursos/:id', async (req, res) => {
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

app.delete('/cursos/:id', async (req, res) => {
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

app.get('/profesores', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM profesores');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar profesores' });
  }
});

app.get('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM profesores WHERE id_profesor = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el profesor' });
  }
});

app.post('/profesores', async (req, res) => {
  try {
    const { nombre, apellido, email, especialidad } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO profesores (nombre, apellido, email, especialidad) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, email, especialidad]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el profesor' });
  }
});

app.put('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, especialidad } = req.body;
    const { rows } = await pool.query(
      'UPDATE profesores SET nombre = $1, apellido = $2, email = $3, especialidad = $4 WHERE id_profesor = $5 RETURNING *',
      [nombre, apellido, email, especialidad, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el profesor' });
  }
});

app.delete('/profesores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM profesores WHERE id_profesor = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el profesor' });
  }
});

app.get('/estudiantes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM estudiantes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar estudiantes' });
  }
});

app.get('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM estudiantes WHERE id_estudiante = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el estudiante' });
  }
});

app.post('/estudiantes', async (req, res) => {
  try {
    const { nombre, apellido, email, fecha_nacimiento } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO estudiantes (nombre, apellido, email, fecha_nacimiento) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, email, fecha_nacimiento]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el estudiante' });
  }
});

app.put('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, fecha_nacimiento } = req.body;
    const { rows } = await pool.query(
      'UPDATE estudiantes SET nombre = $1, apellido = $2, email = $3, fecha_nacimiento = $4 WHERE id_estudiante = $5 RETURNING *',
      [nombre, apellido, email, fecha_nacimiento, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estudiante' });
  }
});

app.delete('/estudiantes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM estudiantes WHERE id_estudiante = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el estudiante' });
  }
});

app.get('/horarios', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM horarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar horarios' });
  }
});

app.get('/horarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM horarios WHERE id_horario = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el horario' });
  }
});

app.post('/horarios', async (req, res) => {
  try {
    const { id_curso, dia_semana, hora_inicio, hora_fin, aula } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO horarios (id_curso, dia_semana, hora_inicio, hora_fin, aula) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_curso, dia_semana, hora_inicio, hora_fin, aula]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el horario' });
  }
});

app.put('/horarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_curso, dia_semana, hora_inicio, hora_fin, aula } = req.body;
    const { rows } = await pool.query(
      'UPDATE horarios SET id_curso = $1, dia_semana = $2, hora_inicio = $3, hora_fin = $4, aula = $5 WHERE id_horario = $6 RETURNING *',
      [id_curso, dia_semana, hora_inicio, hora_fin, aula, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el horario' });
  }
});

app.delete('/horarios/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM horarios WHERE id_horario = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el horario' });
  }
});

app.get('/matriculas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM matriculas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar matrículas' });
  }
});

app.get('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM matriculas WHERE id_matricula = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la matrícula' });
  }
});

app.post('/matriculas', async (req, res) => {
  try {
    const { id_estudiante, id_curso } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO matriculas (id_estudiante, id_curso) VALUES ($1, $2) RETURNING *',
      [id_estudiante, id_curso]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar la matrícula' });
  }
});

app.put('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { id_estudiante, id_curso, estado } = req.body;
    const { rows } = await pool.query(
      'UPDATE matriculas SET id_estudiante = $1, id_curso = $2, estado = $3 WHERE id_matricula = $4 RETURNING *',
      [id_estudiante, id_curso, estado, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la matrícula' });
  }
});

app.delete('/matriculas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('DELETE FROM matriculas WHERE id_matricula = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Matrícula no encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la matrícula' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => {
  console.log(`Servidor en http://localhost:3000`);
});