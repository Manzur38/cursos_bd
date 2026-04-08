const {Pool} = require('pg');
const pool = new Pool ({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'gestion_cursos',
    password: 'tu_contraseña',
    port: 5432,
});

const getCursos = async () => {
    const { rows } = await pool.query('SELECT * FROM cursos');
    return rows; 
};

const getCursosById = async () => {
    const { rows } = await pool.query('SELECT * FROM cursos WHERE id_curso = $1', [id])
    return rows[0];
};

module.exports = {getCursos, getCrusoById};