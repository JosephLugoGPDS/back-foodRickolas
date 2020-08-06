const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

const productoController = require('../controllers/productoController')

const pedidoController = require('../controllers/pedidoController');

const usuarioController = require('../controllers/usuarioController');

//middleware para proteger rutas
const auth = require('../middleware/auth');

module.exports = function () {

    /****CLIENTES***/
    //#####Cliente auth###########

    //signupCliente
    router.post('/signupcliente', clienteController.signupCliente);

    //signinCliente
    router.post('/signincliente', clienteController.signinCliente);

    //Agregar nuevos clientes
    router.post('/clientes', clienteController.nuevoCliente);

    //Obtener clientes
    router.get('/clientes', 
    // auth,
    clienteController.mostrarClientes);

    //Obtener clientes
    router.get('/clientes/:idCliente',clienteController.mostrarCliente);

    //Actualizar cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /****ProductoS****/

    //Agregar nuevos productos y subir imagen
    router.post('/productos',
        productoController.subirArchivo,
        productoController.nuevoProducto);

    //Monstrar todos los productos
    router.get('/productos',
    // auth,
    productoController.mostrarProductos);

    //Mostrar productos con estado:true --falta
    //Mostrar productos true
    router.get('/productos/true',productoController.mostrarProductosTrue);

    //Mostrar productos false
    router.get('/productos/false',productoController.mostrarProductosFalse);

    //Monstrar un producto
    router.get('/productos/:idProducto', productoController.mostrarProducto
    );

    //Actualizar producto por id
    router.put('/productos/:idProducto',
        // auth,
        productoController.subirArchivo,
        productoController.actualizarProducto);

    //Eliminar producto (cambiar estado de true a false)
    router.delete('/productos/:idProducto',
    // auth, 
    productoController.eliminarProducto);

    //Realizar busqueda de productos
    router.post('/productos/busqueda/:query', productoController.buscarProducto);


    /****Pedidos *****/

    //Agregar un pedido, falta agregar funcionalidad
    router.post('/pedidos/nuevo/:id',pedidoController.nuevoPedido);

    //Mostrar pedidos
    router.get('/pedidos', 
    // auth,
    pedidoController.mostrarPedidos);

    //Mostrar pedido por id
    router.get('/pedidos/:idPedido',pedidoController.mostrarPedido);

    //Actualizar pedido
    router.put('/pedidos/:idPedido',pedidoController.actualizarPedido);

    //Eliminar pedido
    router.delete('/pedidos/:idPedido', pedidoController.eliminarPedido);

    //Auth

    /************Usuarios*****/
    //Crear usuario
    router.post('/signup',usuarioController.signupUsuario);
    //ingresar usuario
    router.post('/signin',usuarioController.signinUsuario);

    return router;
}