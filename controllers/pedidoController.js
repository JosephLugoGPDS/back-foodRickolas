const Pedidos = require('../models/Pedidos');

//Agregar un nuevo pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save();
        res.json({
            message: 'se agrego un nuevo pedido'
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {
        //populate('cliente') para mostrar cliente
        //populate.({path,model}) para mostrar producto anidado
        const pedidos = await Pedidos
            .find({}).populate('cliente').populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
        res.json(pedidos);
    } catch (error) {

    }
}

//Mostrar un pedido por id
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido);
    //verificar que exista el pedido
    if (!pedido) {
        res.json({
            message: 'Ese pedido no existe'
        });
        return next();
    }
    //Mostrar pedido
    res.json(pedido);
}

//Actualizar pedido por id
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos
            .findByIdAndUpdate(
                { _id: req.params.idPedido }
                , req.body, {
                new: true
            })
            .populate('cliente')
            .populate({
                path: 'pedido.producto',
                model: 'Productos'
            });
            res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar pedido por id
exports.eliminarPedido = async(req, res, next) => {
    try {
        await Pedidos.
        findByIdAndDelete({ _id: req.params.idPedido});
        res.json('pedido cancelado')
    } catch (error) {
        console.log(error);
        next();
    }
}