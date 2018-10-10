/* eslint-disable consistent-return */

const passport = require('passport');

exports.login = (req,res,next) => {
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
};

exports.logout = (req,res) => {
    req.logout();
    return res.json('Deslogado com sucesso');
};

exports.check = (req,res) => {
    if (req.isAuthenticated()) {
        return res.status(200).json({'user': req.user,
        'status': true});
    }
    return res.redirect('/');
};