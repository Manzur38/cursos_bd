//lO PRIMERO ES IMPORTAR LAS LIBRERIAS 
const express = require ('express');
const{Pool}= require ('pg');
const cors = require ('cors');

//Inicializar la app
const app= express();

// middlewere para que nos devuelva la info en formato JSON
app.use (express.json());

////middelware para poder aceptar solicitudes externas 
app.use(cors());

//vamos a hacer la conexion a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cursos_bd',
    password: '12345678',
    port: 5432
});

//vamos a hacer las rutas del API

//Aviso de funcionamiento correcto de API

app.get('/', async(req,res)=> {
    try {
        res.json({ mensaje: 'API funcionando correctamente!' });
    } catch (error) {
        
    }
});


app.get('/robloxianos', async(req,res) => {
    try {
        const result= await pool.query('select * from robloxianos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


app.get('/juegos', async(req,res) => {
    try {
        const result= await pool.query('select * from juegos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


app.get('/items', async(req,res) => {
    try {
        const result= await pool.query('select * from items');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


app.get('/compras', async(req,res) => {
    try {
        const result= await pool.query('select * from compras');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});


//para probar el API vamos a rrancar el servidor 
app.listen(3000, () =>{
    console.log("Servidor corriendo en la ruta http://localhost:3000");
});

