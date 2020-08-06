const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: Schema.ObjectId,
        ref: 'Clientes'
    },
    pedido: [{
        producto: {
            type: Schema.ObjectId,
            ref: 'Productos'
        },
        cantidad: Number
    }],
    direccion:{
        distrito: {
            type: String,
        },
        calle: String,
        referencia: String,

    },
    estado: {
        type: Boolean,
        default: false
    },
    total: {
        type: Number
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now }
});

module.exports = mongoose.model('Pedidos', pedidosSchema);