/**
 * Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

*/

const express = require('express')
const app = express()
app.use(express.json())
app.listen(8080, () => console.log('Server en puerto: 8080'))

const cont_ = require('./Proyecto2_cont.js')
const productos = new cont_('productos.txt')

app.get('/', (req,res)=>{
    res.send("hola, prueba con [/producotos] o [/productoRandom]")
})

app.get( '/productos', async (req, res) => {
    const allProducts = await productos.getAll()
    res.json( allProducts )
})


app.get( '/productoRandom', async (req, res) => {
    const allProducts = await productos.getAll()
    const randomNumber = Math.floor(Math.random() * allProducts.length )
    res.json( allProducts[randomNumber] )
})