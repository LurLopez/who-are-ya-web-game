const { body, validationResult } = require('express-validator');

exports.playerValidators = [
    body('id')
        .isInt().withMessage('IDak zenbakia izan behar du')
        .notEmpty().withMessage('IDa beharrezkoa da'),
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('Izenak 2 eta 100 karaktere artean izan behar ditu'),
    body('position')
        .isIn(["GK", "DF", "MF", "FW"]).withMessage('Posizioak GK, DF, MF edo FW izan behar du'),
    body('teamId')
        .isInt().withMessage('TeamId zenbakia izan behar da'),
    body('leagueId')
        .isInt().withMessage('LeagueId zenbakia izan behar da'),
    body('nationality')
        .notEmpty().withMessage('Nazionalitatea beharrezkoa da'),
    body('number')
        .optional()
        .isInt({ min: 1, max: 99 }).withMessage('Zenbakia 1 eta 99 artekoa izan behar da')
];


exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Datu okerrak bidali dituzu",
                details: errors.array()
            }
        });
    }
    next(); 
};