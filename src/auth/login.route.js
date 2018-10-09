/* eslint-disable consistent-return */

const express = require('express');
const router = new express.Router();
const passport = require('passport');

router.post('/', (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json(info);
        }
        req.logIn(user, (error) => {
            if (error) {
                return res.json(error);
            }
            return res.json('Autenticado e logado com sucesso');
        });
    })(req,res,next);
});

router.delete('/', (req, res) => {
    req.logout();
    res.json('Deslogado com sucesso');
});

router.get('/auth', (req,res) => {
    const {user} = req;
    if (user) {
        res.status(200).json({user,
        'status': true});
    } else {
        res.redirect('/');
    }
});

module.exports = router;