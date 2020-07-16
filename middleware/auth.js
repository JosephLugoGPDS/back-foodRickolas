const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //autorizacion por el header
    //acceder a la autorizacion
    const authHeader = req.get('Authorization');

    console.log(authHeader);

    if(!authHeader) {
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401;
        throw error;
    }

    //obtener el token Y VERIFICARLO
    //usamos un split a los espacios para obtener token
    //Authorization: Bearer Token   
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, 'SECRETKEY');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
    //Si es un token valido, pero hay un error
    if(!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();

}