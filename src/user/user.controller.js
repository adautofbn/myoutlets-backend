/* eslint-disable no-sync */

const UserModel = require('./user.model');
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req,res) => {
    UserModel.find({}).then((users,err) => {
        if (err) {
          res.status(404).json(err);
        }
        let filteredUsers = users;
        if (req.query.role) {
          filteredUsers = users.filter((user) => user.role === req.query.role.toLowerCase());
        }
        res.status(200).json(filteredUsers);
      });
};

exports.getUserById = (req,res) => {
    UserModel.findOne({'id': req.params.id}).then((user,err) => {
        if (user === null || err) {
          return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
        }
        return res.status(200).json(user);
      });
};

exports.createUser = (req,res) => {

  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  const userCollec = UserModel.estimatedDocumentCount();

  userCollec.then((count) => {
    const user = {
      'id': count + 1,
      'name': req.body.name,
      'email': req.body.email.toLowerCase(),
      'password': req.body.password,
      'role': req.body.role.toLowerCase()
    };

    const newUser = new UserModel(user);

    newUser.save((err) => {
      if (err) {
        const message = err.errmsg || err.message;
        res.status(400).json(message);
      } else {
        res.status(200).json(`Usuário cadastrado com sucesso: ${user.name}`);
      }
    });
  });
};

exports.updateUser = (req,res) => {
    UserModel.findOne({'id': req.params.id}).then((user,err) => {
        if (user === null || err) {
          res.status(404).json(`Usuário ${req.params.id} não encontrado`);
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.role = req.body.role || user.role;

        user.save((errSave) => {
          if (errSave) {
            const message = errSave.message || errSave.errmsg;
            res.status(400).json(message);
          } else {
            res.status(200).json('Usuário atualizado com sucesso');
          }
        });
      });
};

exports.deleteUser = (req,res) => {
    UserModel.deleteOne({'id': req.params.id}).then((err) => {
        if (err.n === 0) {
          return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
        }
        return res.status(200).json(`Usuário ${req.params.id} deletado com sucesso`);
    });
};