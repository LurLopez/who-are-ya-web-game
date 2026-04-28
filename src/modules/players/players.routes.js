const express = require('express');
const router = express.Router();
const playerController = require('./players.controller');
const { protect, adminOnly } = require('../../middleware/auth.middleware');
// Inportatu biak middleware fitxategitik
const { playerValidators, handleValidationErrors } = require('../../middleware/error.middleware');


//GET players:
router.get('/', playerController.getPlayers); //Kasu honetan publikoa egingo dugu, hau da ez dira nabegatzaileko cookiak begiratuko.


//GET players/:id: 
router.get('/:id', playerController.getPlayerById);


// POST players
router.post('/', 
    protect,    
    adminOnly,  
    playerValidators,       
    handleValidationErrors,  
    playerController.createPlayer 
);


// PUT players/:id: 
router.put('/:id', 
    protect,    
    adminOnly,  
    playerValidators,        
    handleValidationErrors,  
    playerController.updatePlayer 
);

//DELETE players/:id:
router.delete('/:id',
    protect,
    adminOnly, 
    playerController.deletePlayer);


module.exports = router;