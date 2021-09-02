const {body} = require('express-validator');

module.exports = [
    body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio'),

    body('precio')
    .notEmpty().withMessage('El precio es obigatorio'),
    
    body('descripcion')
    .isLength({
        min : 10
    }).withMessage('La descripción debe tener como mínimo 10 caracteres'),

    body('categoria')
    .notEmpty()
    .withMessage('Indica la categoría'),

    body('descuento')
    .notEmpty().withMessage('Debe poner un número')
    
]