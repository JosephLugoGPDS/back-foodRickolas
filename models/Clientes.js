const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientesSchema = new Schema ( {
    nombre:{
        type: String,
        required: true 
    },
    apellido:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true 
    },
    password:{
        type: String,
        required: true 
    },
    telefono:{
        type: String,
        required: true 
    },
    rol:{
        type: String,
        default: 'CLIENTE ROL'
    },
    dni:{
        type: String,
        required: true
    },
    fecha_nacimiento:{
        type: String,
    },
    sexo:{
        type: String,
    },
    google:{
        type: Boolean,
        default: false
    }
    
} );

module.exports = mongoose.model('Clientes', clientesSchema);