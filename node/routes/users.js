var User = require("../schemas/user");
var uuid = require('../utils').uuid;

/*
 * List /users
 */
exports.list = function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
};

/*
 * GET /users/:id
 */
exports.read = function (req, res) {
  User.findOne({
    id: req.params.id
  }, function (err, users) {
    if (err) {
      console.error(err);
    } else {
      res.send(users);
    }
  });
};

/*
 * POST /users
 * Creates new user
 */
exports.create = function (req, res) {
  var user = new User({
    id: uuid(),
    name: req.body.name,
    logoutUrl: req.body.logoutUrl
  });

  user.save(function (err, user) {
    if (err) {
      console.error(err);
    } else {
      res.send(user);
    }
  });
};

/*
 * PUT /users/:id
 * Updates existing user
 */
exports.update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.error(err);
    } else {
      if (!user) {
        res.send(500, "can't find user");
      } else {
        user.name = req.body.name;
        user.logoutUrl = req.body.logoutUrl;

        user.save(function (err, user) {
          if (err) {
            console.error(err);
          } else {
            res.send(user);
          }
        });
      }
    }
  });
};

/*
 * DELETE /users/:id
 * Deletes existing user
 */
exports.del = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.error(err);
    } else {
      if (!user) {
        res.send(500, "can't find user");
      } else {
        user.remove(function (err, user) {
          if (err) {
            console.error(err);
          } else {
            res.send(user);
          }
        });
      }
    }
  });
};