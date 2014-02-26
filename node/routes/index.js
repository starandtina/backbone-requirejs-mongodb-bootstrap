exports.read = function (req, res) {
  require('./' + req.params.resource).read(req, res);
};

exports.list = function (req, res) {
  require('./' + req.params.resource).list(req, res);
};

exports.create = function (req, res) {
  require('./' + req.params.resource).create(req, res);
};

exports.update = function (req, res) {
  require('./' + req.params.resource).update(req, res);
};

exports.del = function (req, res) {
  require('./' + req.params.resource).del(req, res);
};
