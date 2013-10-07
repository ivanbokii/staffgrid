var gridData = require('../data/data')

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.getData = function (req, res) {
  res.json(gridData);
}