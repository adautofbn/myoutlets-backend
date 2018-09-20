const express = require('express');
const router = new express.Router();
const validUtil = require('../util/validate.util');

const UserModel = require('./user.model');

router.get('/', (req,res) => {
  UserModel.find({}).then((usersDb,err) => {
    if (err) {
      return res.status(404).json(err);
    }
    let filteredUsers = usersDb;
    if (req.query.type) {
      filteredUsers = usersDb.filter((user) => user.type === req.query.type.toLowerCase());
    }
    return res.status(200).json(filteredUsers);
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
  const {error} = validUtil.validateUser(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

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
        console.error(err);
      }
    });
  });
  return res.status(201).json(`Usuário cadastrado com sucesso: ${req.body.name}`);
});

router.put('/:id', (req,res) => {
    const {error} = validUtil.validateUser(req.body, true);

    if (error) {
      res.status(400).json(error.details[0].message);
    }

    UserModel.findOne({'id': req.params.id}).then((userDb,err) => {
      if (userDb === null || err) {
        return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
      }
      userDb.name = req.body.name || userDb.name;
      userDb.email = req.body.email || userDb.email;
      userDb.password = req.body.password || userDb.password;
      userDb.type = req.body.type || userDb.type;

      userDb.save((errSave) => {
        if (errSave) {
          console.log(errSave);
        }
      });
      return res.status(200).json('Usuário atualizado com sucesso');
    });
});

router.delete('/:id', (req,res) => {
    UserModel.deleteOne({'id': req.params.id}).then((err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.status(200).json('Usuário deletado com sucesso');
});

module.exports = router;