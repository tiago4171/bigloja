const db = require('../models');
const Data = db.UserData;
const User = db.User;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const config = require('../config/auth.config');

module.exports.saveUserData = (req, res) => {
  const data = new Data({
    title: req.body.title,
    description: req.body.description,
    screenshots: req.body.screenshots,
  });

  data.save((error, data) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }
    res.status(200).send({ message: 'Dados salvos com sucesso!' });
  });
};

module.exports.dataListAll = (req, res) => {
  // tem que verificar se o email atual está logado e se não inspirou o tempo logado
  User.findOne({
      email: { $eq: req.body.email }
    })
    .exec((error, user) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }

      try {
        const verify = jwt.verify(req.body.accessToken, config.secret);
        if (verify.exp < Date.now()) {
          Data.find((error, data) => {
            if (error) {
              res.status(500).send({ message: error });
              return;
            }
            res.status(200).send(JSON.stringify(data));
          });
        }
      } catch (error) {
        console.log('req.body = ',req.body);
        console.log('Error server = ',error);
      }
  });
};

module.exports.deleteRecord = (req, res) => {
  console.log('estamos deletando ', req.body);
  // tem que verificar se o email atual está logado e se não inspirou o tempo logado
  User.findOne({
    email: { $eq: req.body.email }
  })
  .exec((error, user) => {
    if (error) {
      res.status(500).send({ message: error });
      return;
    }

    try {
      const verify = jwt.verify(req.body.accessToken, config.secret);
      if (verify.exp < Date.now()) {
        Data.deleteOne({
            _id: { $eq: req.body._id }
          })
          .exec((error, data) => {
          if (error) {
            res.status(500).send({ message: error });
            return;
          }
          res.status(200).send({ message: 'Registro deletyado com sucesso!' });
        });
      }
    } catch (error) {
      console.log('req.body = ',req.body);
      console.log('Error server = ',error);
    }
});
};