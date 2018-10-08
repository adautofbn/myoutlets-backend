/* eslint-disable no-sync */

const express = require('express');
const router = new express.Router();
const bcrypt = require('bcryptjs');


const UserModel = require('./user.model');

router.get('/', (req,res) => {
  UserModel.find({}).then((users,err) => {
    if (err) {
      res.status(404).json(err);
    }
    let filteredUsers = users;
    if (req.query.type) {
      filteredUsers = users.filter((user) => user.type === req.query.type.toLowerCase());
    }
    res.status(200).json(filteredUsers);
  });
});

router.get('/:id', (req,res) => {
    UserModel.findOne({'id': req.params.id}).then((user,err) => {
      if (user === null || err) {
        return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
      }
      return res.status(200).json(user);
    });
});

router.post('/', (req,res) => {

  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

  const userCollec = UserModel.estimatedDocumentCount();

  userCollec.then((count) => {
    const user = {
      'id': count + 1,
      'name': req.body.name,
      'email': req.body.email.toLowerCase(),
      'password': req.body.password,
      'type': req.body.type.toLowerCase()
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
});

router.put('/:id', (req,res) => {
    UserModel.findOne({'id': req.params.id}).then((user,err) => {
      if (user === null || err) {
        res.status(404).json(`Usuário ${req.params.id} não encontrado`);
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.type = req.body.type || user.type;

      user.save((errSave) => {
        if (errSave) {
          const message = errSave.message || errSave.errmsg;
          res.status(400).json(message);
        } else {
          res.status(200).json('Usuário atualizado com sucesso');
        }
      });
    });
});

router.delete('/:id', (req,res) => {
    UserModel.deleteOne({'id': req.params.id}).then((err) => {
      if (err.n === 0) {
        return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
      }
      return res.status(200).json(`Usuário ${req.params.id} deletado com sucesso`);
    });
});

module.exports = router;