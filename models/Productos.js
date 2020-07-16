const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productosSchema = new Schema({
    categoria: {
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    }

});

module.exports = mongoose.model('Productos', productosSchema);