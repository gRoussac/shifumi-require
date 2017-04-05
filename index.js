const requirejs = require('requirejs')
  .config({
      baseUrl: 'scripts',
      nodeRequire: require
  });

const Game = requirejs('dist/game');

module.exports = Game.start();