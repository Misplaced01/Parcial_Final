var Team = require('../models/teams');
var debug = require('debug')('parcial_Final:teams_controller');

//search all teams
module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Team List", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Team.find({}, "-login_count")
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((teams) => {
            debug("Found teams", teams);
            return res.status(200).json(teams)
        }).catch(err => {
            next(err);
        });

}

//search one team in the database
module.exports.getOne = (req, res, next) => {
    debug("Search Team", req.params);
    Team.findOne({
            name: req.params.name
        },"-login_count")
        .then((foundTeam) => {
            debug("Found Team", foundTeam);
            if (foundTeam)
                return res.status(200).json(foundTeam);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

//New Team

module.exports.register = (req, res, next) => {
    debug("New Team", {
        body: req.body
    });
    Team.findOne({
            name: req.body.name
        }, "-login_count")
        .then((foundTeam) => {
            if (foundTeam) {
                debug("Equipo duplicado");
                throw new Error(`Equipo duplicado ${req.body.name}`);
            } else {
                let newTeam = new Team({
                    name: req.body.name,
                    country: req.body.country || "",
                    technical_director: req.body.technical_director || "",
                    captain: req.body.captain,
                    league: req.body.league
                });
                return newTeam.save();
            }
        }).then(team => {
            return res
                .header('Location', '/teams/' + team.name)
                .status(201)
                .json({
                    name: team.name
                });
        }).catch(err => {
            next(err);
        });
}

//Update team

module.exports.update = (req, res, next) => {
    debug("Update team", {
        name: req.params.name,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Team.findOneAndUpdate({
            name: req.params.name
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

//Delete team

module.exports.delete = (req, res, next) => {

    debug("Delete team", {
        name: req.params.name,
    });

    Team.findOneAndDelete({name: req.params.name})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}