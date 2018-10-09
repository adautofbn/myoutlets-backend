/* eslint-disable */

const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../user/user.model');
const bcrypt = require('bcryptjs');

function validPassword (password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = function(passport) {

    function findUserById(id, callback) {
        const ObjectId = require("mongodb").ObjectId;
        UserModel.findById(id, (err, doc) => {
            callback(err, doc);
        });
    }

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        findUserById(id, function(err,user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy(
    {
        'usernameField': 'email',
        'passwordField': 'password'
    },
    (email, password, done) => {
        UserModel.findOne({email}, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, 'Usuário não encontrado ou email inválido');
            }

            const hash = user.password;
            if (!validPassword(password, hash)) {
                return done(null, false, 'Senha incorreta');
            }

            return done(null, user);
        });
    }
));
};