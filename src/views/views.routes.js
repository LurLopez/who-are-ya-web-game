const express = require('express');
const router = express.Router();
const { protectAdminView, checkUser } = require('../middleware/auth.middleware');


router.use(checkUser);


router.get('/login', (req, res) => {
    
    if (req.user) return res.redirect('/');
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    if (req.user) return res.redirect('/');
    res.render('auth/register', { error: null, formData: {} }); 
});


router.get('/admin', protectAdminView, (req, res) => {
    res.render('admin/admin', { user: req.user }); 
});

router.get('/admin/players/new', protectAdminView, (req, res) => {
    res.render('admin/sortu', { user: req.user }); 
});

router.get('/admin/players/manage', protectAdminView, (req, res) => {
    res.render('admin/aldatu', { user: req.user }); 
});

router.get('/user/ikusi', (req, res) => {
    res.render('user/jokalariakikusi', { error: null, formData: {} }); 
});

module.exports = router;