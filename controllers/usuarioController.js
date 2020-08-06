const Usuarios = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Registrar usuario
exports.signupUsuario = async(req, res) =>{
    //leer los datos del formulario
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password,10);
    try {
        await usuario.save();
        res.json({message: 'usuario creado correctamente'})
    } catch (error) {
        console.log(error);
        res.json({message: 'Hubo un error'});
    }
}
 
//Autenticar usuario
//requiere next por si no existe un usuario
exports.signinUsuario = async (req, res, next) => {
    //buscar usuario
    //Destructuring
    const { email, password } = req.body;
    const usuario = await Usuarios.findOne({ email });

    if(!usuario) {
        //si el usuario no existe
        await res.status(401).json({message: 'Ese usuario no existe'});
        next();
    } else {
        //El usuario existe
        if(!bcrypt.compareSync(password, usuario.password)){
            //si el password es incorrecto
            await res.status(401).json({
                message: 'password incorrecto'
            })
            next();
        } else {
            //password correcto, firmar el token
            const token = jwt.sign({
                //pasamos payload=datos firmar el token
                email: usuario.email,
                nombre: usuario.nombre,
                id: usuario._id
            },
            'SECRETKEY',//pasar en auth
            {
                expiresIn: '1h'
            });
            //retornar el token
            res.json({token});
        }
    }
}