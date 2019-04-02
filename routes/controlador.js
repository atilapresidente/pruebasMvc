const express = require('express');//requiero el módulo 'express'
var router = express.Router();//creo la variable que enruta express a las peticiones

const modelo = require('../modelos/modeloRecetas');//requiero al archivo de la carpeta 'routes' donde tengo el método query

//con el método 'get', y a través de la variable 'router' definidida arriba, llamo a la plantilla 'nuevaReceta.pug' y le 
//digo que con la ruta '/nuevaReceta' la pueda ver por el navegador
router.get('/nuevaReceta', (req, res)=>{//url
//renderizo la plantilla
res.render('nuevaReceta');
});

//creo el método 'post', y a través de la variable 'router' definidida arriba, me permitirá enviar los datos 
//introducidos en el formulario
router.post('/nuevaReceta', (req, res)=>{//url
	//la constante 'modelo' requiere la función 'insertaReceta' del archivo 'modeloRecetas' y al 'body' de la plantilla 'nuevaReceta'. a través de un callback, y como
	//resultado (res) nos redirigirá (redirect) a la ruta del navegador donde se renderiza la plantilla
	modelo.insertaReceta(req.body, (error, resultado)=>res.redirect('/nuevaReceta'));
});

//ejercicio3
router.get('/consultaRecetas/:id_receta', (req, res) => {//url. Método 'get' xq es consulta de datos
	//la constante 'modelo' requiere la función 'consultaReceta' del archivo 'modeloRecetas' y requiere al parámetro
	//'id_receta' que requerimos en el navegador
	modelo.consultaReceta(req.params.id_receta, (error, result) => {
	//resultado (res) renderizará en el navegador la plantilla 'consultaRecetas' con los datos extraídos de la BD
	//según la id que hemos puesto en el navegador
		res.render('consultaRecetas', {receta: result});//'receta' viene de la plantilla 'consultaReceta', carpeta Modelos
	});
});

//hoja 29, ejercicio 2
router.get('/eliminaReceta', (req, res)=>{//ruta url
	res.render('eliminaReceta');//plantilla pug, dentro de views
})

router.delete('/eliminaReceta/eliminar', (req, res)=>{//ruta url, metodo borrar
	//llamo a la constante 'modelo', que requiere a la función 'eliminaReceta' del archivo 'modeloRecetas.js' de la carpeta 'modelo'
	//y al body de la plantilla 'eliminaReceta.pug'.
	modelo.eliminaReceta(req.body.nombre, (error, resultado)=>{//'nombre' es el name que le hemos puesto en el formulario de la plantilla 'eliminaReceta.pug'
		res.render('eliminaReceta',{mensaje:"Se eliminaron las recetas que contienen la palabra: " + req.body.nombre})
	});
})

/*
De momento lo dejamos, lo hará Jano
//hoja 29, ejercicio 3
router.get('eliminaReceta',(req, res)=>{
	res.render('eliminaReceta');
})

router.delete('/eliminaReceta/eliminar/:nombre', (req, res)=>{
	modelo.eliminaReceta(req.params.nombre, (error, resultado)=>{
		res.render('eliminaReceta',{mensaje:"Se eliminaron las recetas que contienen la palabra: " + req.body.nombre})
	});
})
*/

//hoja 29 ejercicio 4
//Antes de crear la plantilla hago el controlador y el modelo (modeloRecetas).
//En este caso no hago un get para visualizar la plantilla y después el método, sino que lo hago todo en la misma
//función, primero requiero a la constante 'modelo', que requiere a la función 'todasRecetas', y cuyo callback 
//procede a renderizar la plantilla 'actualizaReceta', rellenando los registros con el resultado contenido
//del fichero 'modeloRecetas'.
//Primero consulto todas las recetas. La 1ª vez que consulto, ya relleno el formulario y lo envío, por lo que
//en una 2ª consulta, el select name seleccionaRecetaForm ya existe.(primer 'if').
//con el elsse, cuando ya he realizado la primera consulta, lo que hace es rellenar el segundo formulario con
//registros2
router.get('/actualizaReceta', (req, res)=>{//ruta url
	modelo.todasRecetas((error, resultado)=>{
		if(!req.query.nombresRecetas){// el signo de exclamación '!' significa 'si no existe'
			res.render('actualizaReceta', {registros:resultado})
		}
		else{
			modelo.consultaReceta(req.query.nombresRecetas, (error2, resultado2)=>{
				res.render('actualizaReceta', {registros:resultado, registros2:resultado2});
			})
		}
	})

});

//hoja29, ejercicio4. Ahora vamos a actualizar los datos, que se modificarán en la BD
router.put('/actualizaReceta/actualizar', (req, res)=>{//ruta url
	modelo.updateReceta(req.body, (error, resultado)=>{res.send("Registro actualizado con éxito")});
})
	



module.exports = router;//exporto la variable'router'
