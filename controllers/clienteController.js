const Clientes = require('../models/Clientes');
const bcrypt = require('bcrypt');

// agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    let cliente = new Clientes(req.body);
    cliente.password = await bcrypt.hash(req.body.password,10)
    try {
        //almacenar registro
        await cliente.save();
        res.json({
            ok: true,
            message: "El administrador agregó un nuevo cliente"
        })
    } catch (error) {
        res.send(error);
        next();
    }

}


exports.signupCliente = async (req, res, next) =>{
    let newCliente = new Clientes(req.body);
    newCliente.password = await bcrypt.hash(req.body.password,10)
    try {
        await newCliente.save();
        res.json({
            ok: true,
            message: "Bienvenido cliente"
        })
    } catch (error) {
        res.send(error);
        next();
    }

}

// exports.signinCliente = async (req, res) =>{
//     //recibimos un correo y un psssword
//     const {email, password} = req.body;
//     //buscamos por correo
//     const cliente = await Clientes.findOne({email})
//     //Validaciones
//     //usuario no logeado
//     if(!cliente) return res.status(401).send("El correo no existe");
//     //verificacion de contraseña
//     if(cliente.password !== password) return res.status(401).send("contraseña errada");
//     //devolvemos el status
//     return res.status(200).json(
//         cliente
//     );
// }
exports.signinCliente = async (req, res, next) =>{
    //recibimos un correo y un psssword
    const {email, password} = req.body;
    //buscamos por correo
    const cliente = await Clientes.findOne({email})
    //Validaciones
    //cliente correo no existe
    if(!cliente) {await res.status(401).send("El correo no existe");
    next();
} else {
    //cliente si existe
    if(!bcrypt.compareSync(password,cliente.password)){
        await res.status(401).json({
            message: 'password incorrecto'
        })
        next();
    } else {
        //Si pasa todas las validaciones devolvemos el status y cliente
        return res.status(200).json(
         cliente
     );
    }
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

//actualizar cliente por su id
exports.actualizarCliente = async (req, res, next) => {

    let body = req.body;
    delete body.password

    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, body, {
            new : true
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

