(function(){
  "use strict";

  function Player(choices, shuffle) {

    const REGEX_CAPITALIZE = /\b\w/g;

    return {

      play(cheat = '') {
        if (cheat) {
          return cheat.toLowerCase().replace(REGEX_CAPITALIZE, letter => letter.toUpperCase());
        }
        const [choice] = shuffle([...choices]);
        return choice;
      }

    };
  }

  define(
    'player',
    ['random-js'],
    function(random) {
      const choices = new Set(['Paper', 'Rock', 'Scissors']),
            engine = random.engines.nativeMath,
            shuffle = (array) => random.shuffle(engine, array);
      return Player(choices, shuffle);
    }
  );

})();