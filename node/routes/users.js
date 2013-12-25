var UserModel = require("../schemas/user");

/*
 * GET users
 */
exports.list = function (req, res) {
    UserModel.find(function (err, users) {
        if (err) {
            console.error(err);
        } // TODO handle the error
        else {
            res.send(users);
        }
    });
};

/*
 * GET users
 */
exports.read = function (req, res) {
    UserModel.findOne({
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
    var user = new UserModel({
        id: req.body.id,
        name: req.body.name,
        logoutUrl: req.body.logoutUrl
    });

    user.save(function (err, user) {
        if (err) {
            console.error(err);
        } // TODO handle the error
        else {
            res.send(user);
        }
    });
};

/*
 * PUT /users/id
 * Updates existing user
 */
exports.update = function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
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
                    } // TODO handle the error
                    else {
                        res.send(user);
                    }
                });
            }
        }
    });
};

/*
 * DELETE /users/id
 * Deletes existing user
 */
exports.del = function (req, res) {
    UserModel.findById(req.params.id, function (err, user) {
        if (err) {
            console.error(err);
        } else {
            if (!user) {
                res.send(500, "can't find user");
            } else {
                user.remove(function (err, user) {
                    if (err) {
                        console.error(err);
                    } // TODO handle the error
                    else {
                        res.send(user);
                    }
                });
            }
        }
    });
};