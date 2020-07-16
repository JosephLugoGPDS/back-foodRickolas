const Clientes = require('../models/Clientes');

// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //almacenar registro
        await cliente.save();
        res.json({
            ok: true,
            message: "Se creo un  nuevo cliente"
        })
    } catch (error) {
        res.send(error);
        // console.log(error);
        next();
    }

}

//mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        // console.log(error);
        res.send(error);
        next();
    }
}

//mostrar Cliente por id
exports.mostrarCliente = async (req, res, next) => {
    const cliente = await Clientes.findById(req.params.idCliente);
    if (!cliente) {
        res.json({
            message: 'Cliente no existe'
        });
        next();
    }
    //Mostrar el cliente
    res.json(cliente);
}

//Actualizar cliente por su id
exports.actualizarCliente = async (req, res, next) => {
    try {
        let cliente = await Clientes
            .findOneAndUpdate
            ({ _id : req.params.idCliente },
                req.body, {
                new: true
            });
            res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }
}  

//Eliminar cliente por su id
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.
        findOneAndDelete({ _id : req.params.idCliente});
        res.json({
            message: 'Cliente eliminado'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}    