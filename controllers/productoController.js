const Productos = require('../models/Productos');
//para las imagenes
const multer = require('multer');
const shortid = require('shortid');
const { Router } = require('express');

//Cargar imagenes configuracion JPEG y PNG acortando links(short)
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) =>{
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if (
            file.mimetype === 'image/jpeg' 
            || file.mimetype ==='image/png'){
                cb(null, true);
        } else {
            cb(new Error('Formato no valido'))
        }
    },
}

//Pasar la configuracion y el campo imagen
const upload = multer(configuracionMulter).single('imagen');

//Subir una imagen
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error){
        if(error) {
            res.json({message: error});
        }
        return next();
    })
}


//Agregar nuevo producto con su imagen
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body);
    try {
        //verificar imagen
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        //guardar producto
        await producto.save();
        res.json({
            message: 'Producto agregado'
        })
    } catch (error) {
        console.log(error);
        next();
    }
}
//Mostrar todos los productos (estado: true y false)
exports.mostrarProductos = async (req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//solo mostrar productos (estado: true)
exports.mostrarProductosTrue = async (req, res, next) => {
    try {
        const productos = await Productos.find({ estado: true });
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}
//Falta modificar stock a 0 o en todo caso quitar stock
//solo mostrar productos (estado: false)
exports.mostrarProductosFalse = async (req, res, next) => {
    try {
        const productos = await Productos.find({ estado: false });
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Mostrar un producto por su id
exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos
        .findById(req.params.idProducto);

    if (!producto) {
        res.json({
            message: 'No existe ese producto'
        });
        return next();
    }
    //Mostrar el producto
    res.json(producto);
}

//Actualizar un producto por su id
exports.actualizarProducto = async (req, res, next) => {
    try {
        /*actualizar imagen*/
        // let productoAnterior = await Productos.findById(req.params.idProducto);
        
        //construir una nueva imagen
        let nuevoProducto = req.body;
        
        //verificar si hay una imagen nueva
        if(req.file) {//req.file.filename
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        //actualizar producto (nuevo producto por req.body)
        let producto = await Productos.findByIdAndUpdate({ _id: req.params.idProducto}, nuevoProducto, {
            new: true
        });
        res.json(producto);
    } catch (error) {
        console.log(error);
        next();
    }
}

//Eliminar producto (cambio de estado)
exports.eliminarProducto = async(req, res, next) => {
    //En vez de req.body enviamos solo cambioEstado
    let cambiaEstado = {
        estado: false
    }
    try {
        const producto = await Productos.findByIdAndUpdate({
             _id: req.params.idProducto},cambiaEstado,{
                 new: true
        })
        res.json(producto);
    } catch (error) {
        consoles.log(error);
        next();
    }
}