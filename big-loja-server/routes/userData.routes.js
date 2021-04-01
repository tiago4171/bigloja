const controller = require('../controllers/userData.controller');


module.exports = function (app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/data/save', controller.saveUserData);
  // o axios.get não tem body
  app.post('/api/data/list-all', controller.dataListAll);
  // TODO: remover esta gambiarra, era pra ser um delete
  app.post('/api/data/delete/', controller.deleteRecord);
};