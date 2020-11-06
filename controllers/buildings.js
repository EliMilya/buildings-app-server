const buildings = require('../data.json')

module.exports.getAllBuildings = function (req, res) {
  res.status(200).json({
    buildings: buildings,
  });
};

