(function() {
  "use strict";

  function Game(Player) {

    const game = {
      _nb_round: 1000,
      getNbOfRounds() {
        return game._nb_round;
      },
      start() {
        this._fight();
      },
      stats() {

      },
      _fight() {
        Player.play();
        Player.play('Paper');
      }
    },
    {getNbOfRounds, start, stats} = game;

    const render = {
      getNbOfRounds,
      start,
      stats
    };

    /* start-test-code */
    const {_fight} = game;
    render._fight = _fight;
    /* end-test-code */

    return render;
  }

  define(
    'game',
    ['player'],
    (player) => new Game(player)
  );

})();