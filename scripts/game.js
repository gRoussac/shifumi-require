(function() {

  function Game() {

    const game = {
      _nb_round : 1000,
      getNbOfRounds() {
        return game._nb_round;
      },
      start() {
        this._fight();
      },
      stats() {

      },
      _fight() {
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

  const game = new Game();
  define('game', game);

})();