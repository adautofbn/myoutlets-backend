const express = require('express');
const router = new express.Router();
const cache = require('memory-cache');

const userUtil = require('./user.util');
const validUtil = require('../util/validate.util');

const users = require('./users.json');
const UserModel = require('./user.model');

cache.put('users', users);

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

    let message = '';

    const {error} = validUtil.validateUser(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    if (!message) {
      const user = {
        'id': users.length + 1,
        'name': req.body.name,
        'email': req.body.email.toLowerCase(),
        'password': req.body.password,
        'type': req.body.type.toLowerCase()
      };

      users.push(user);

      const newUser = new UserModel(user);

      newUser.save((err) => {
        if (err) {
          console.error(err);
        }
      });

      message = `Usuário cadastrado com sucesso: ${user.name}`;
    }
    cache.put('users', users);
    return res.status(201).json(message);
});

router.put('/:id', (req,res) => {
    const user = userUtil.findUser(cache.get('users'),req.params.id);
    if (!user) {
      return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
    }

    const {error} = validUtil.validateUser(req.body, true);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    UserModel.findOne({'id': req.params.id}).then((userDb,err) => {
      if (userDb === null || err) {
        res.status(404).json(`Usuário ${req.params.id} não encontrado`);
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
    });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.type = req.body.type || user.type;

    cache.put('users', users);
    return res.status(200).json(`Usuário atualizado com sucesso: ${user.name}`);
});

router.delete('/:id', (req,res) => {

    const user = userUtil.findUser(cache.get('users'),req.params.id);
    if (!user) {
      return res.status(404).json(`Usuário ${req.params.id} não encontrado`);
    }

    UserModel.deleteOne({'id': req.params.id}).then((err) => {
      if (err) {
        console.log(err);
      }
    });

    const index = users.indexOf(user);
    users.splice(index,1);

    cache.put('users', users);
    return res.status(200).json(`Usuário deletado com sucesso: ${user.name}`);
});

module.exports = router;