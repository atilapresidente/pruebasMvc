const mysql = require('mysql');//requiero el módulo 'mysql'
const conexion = require('../conectar');//mi archivo de conexión a la base de datos

const insertaReceta = (receta,callback)=>{ //creo el método 'insertaReceta'. 'receta' corresponde a 'req.body' (es un objeto). Es lo que voy a pasar por el query
	console.log("entro2");//en consola me aseguro de que funciona
	//creo la query que introducirá la receta a la base de datos. 'receta.nombre' equivale a 'req.body.nombre'
	conexion.query('INSERT INTO recetas(nombre, descripcion) VALUES ("'+ receta.nombre +'","'+ receta.descripcion +'");', (error, resultado)=>{
		//devuelve el 'callback' de arriba, que a su vez devuelve el callback 'error, resultado' del query
		return callback(error, resultado);
	})
};

//ejercicio3
const consultaReceta = (id_receta, callback) => {//creo el método 'consultaReceta'. 'id_receta' corresponde a req.params (objeto). Es el párámetro que pondremos en el navegador
//hago el query a la tabla. el interrogante es el nº de id que pondré en el navegador.
//'id_receta' viene del callback de arriba
	conexion.query('SELECT * FROM recetas WHERE id_receta = ?', id_receta, (error, result) => {
		console.log(result);
		return callback(error, result);
	});
};

//hoja 29, ejercicio 2
//creo el método 'eliminaReceta'. 
const eliminaReceta = (texto, callback)=>{
	//con esta query seleccionamos de la base de datos aquellos registros que contengan la palabra que introducimos en el
	//formulario, que se hace a través de 'LIKE "%"?"%"'
	conexion.query('DELETE FROM recetas WHERE nombre LIKE "%"?"%"', texto, (error, resultado)=>{//'texto' viene del callback anterior
		if (error) throw error;
		else {
			return callback(error, resultado);
		}
	});
}

//hoja 29 ejercicio 4 seleccionar todas las recetas de la BD
const todasRecetas = (callback)=>{
	conexion.query('SELECT * FROM recetas', (error, resultado)=>{//selecciona todas las recetas de la BD
		if (error) throw error;
		else{
			return callback(error, resultado)
		}
	})
}

//hoja 29 ejercicio 4. Actualizar base datos
const updateReceta =(receta, callback)=>{
	conexion.query('UPDATE recetas SET nombre=?, descripcion=? WHERE id_receta=?',[receta.nombre, receta.descripcion, receta.id_receta], (error, resultado)=>{
		if (error) throw error;
		else{
			return callback(error, resultado)
		}
	})
}

//ejercicios 2 y 3 hoja 28
//hoja 29
module.exports = {
	insertaReceta,//exporto la constante'insertaReceta', que es un método (archivo 'controlador.js')
	consultaReceta,//exporto la constante'consultaReceta', que es un método (archivo 'controlador.js')
	eliminaReceta,//Hoja 29, ejer 2. Exporto la constante'eliminaReceta', que es un método (archivo 'controlador.js')
	todasRecetas,//Hoja 29, ejer 4. Exporto la constante'todasRecetas', que es un método (archivo 'controlador.js')
	updateReceta//Hoja 29, ejer 4. Exporto la constante'updateRecetas', que es un método (archivo 'controlador.js')

};

