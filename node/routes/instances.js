var Instance = require('../schemas/instance');
var uuid = require('../utils').uuid;

/*
 * List /instances
 */
exports.list = function (req, res) {
  Instance.find(function (err, instances) {
    if (err) {
      console.error(err);
    } else {
      res.send(instances);
    }
  });
};

/*
 * GET /instances/:id
 */
exports.read = function (req, res) {
  Instance.findOne({
    id: req.params.id
  }, function (err, instances) {
    if (err) {
      console.error(err);
    } else {
      res.send(instances);
    }
  });
};

/*
 * POST /instances
 * Creates new instance
 */
exports.create = function (req, res) {
  var instance = new Instance({
    id: uuid(),
    type: req.body.type,
    description: req.body.description,
    database: req.body.database,
    password: req.body.password,
    createTime: req.body.createTime
  });

  instance.save(function (err, instance) {
    if (err) {
      console.error(err);
    } else {
      res.send(instance);
    }
  });
};

/*
 * PUT /instances/:id
 * Updates existing instance
 */
exports.update = function (req, res) {
  Instance.findById(req.params.id, function (err, instance) {
    if (err) {
      console.error(err);
    } else {
      if (!instance) {
        res.send(500, "can't find instance");
      } else {
        instance.type = req.body.type;
        instance.description = req.body.description;
        instance.database = req.body.database;
        instance.password = req.body.password;
        instance.createTime = req.body.createTime;

        instance.save(function (err, instance) {
          if (err) {
            console.error(err);
          } else {
            res.send(instance);
          }
        });
      }
    }
  });
};

/*
 * DELETE /instances/:id
 * Deletes existing instance
 */
exports.del = function (req, res) {
  Instance.findById(req.params.id, function (err, instance) {
    if (err) {
      console.error(err);
    } else {
      if (!instance) {
        res.send(500, "can't find instance");
      } else {
        instance.remove(function (err, instance) {
          if (err) {
            console.error(err);
          } else {
            res.send(instance);
          }
        });
      }
    }
  });
};
