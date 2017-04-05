const requirejs = require('requirejs')
  .config({
      baseUrl: 'scripts',
      nodeRequire: require
  });

const Game = requirejs('game');

module.exports = Game.start();