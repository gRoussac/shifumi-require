const
  {assert, expect, should} = require('chai'),
  sinon = require('sinon'),
  requirejs = require('requirejs'),
  public_flag = ':public';

should(); //[chai]http://chaijs.com/guide/styles/#should

let baseUrl;
for (const arg of process.argv) {
  if (arg.indexOf(public_flag) !== -1) {
    baseUrl = 'dist';
    break;
  } else {
    baseUrl = 'scripts';
  }
}

requirejs.config({
    baseUrl: baseUrl,
    //nodeRequire: require
});

const Game = requirejs('game');

describe('Game', function() {
  it(['should be an object', public_flag].join(''), function() {
    Game.should.be.an('object');
  });
  it(['getNbOfRounds should be an function of get Object' + public_flag].join(''), function() {
    Game.getNbOfRounds.should.be.a('function');
  });

  it(['can call getNbOfRounds', public_flag].join(''), function() {
    const callback =  sinon.stub(Game, 'getNbOfRounds').returns(true);
    expect(Game.getNbOfRounds()).to.equal(true);
    Game.getNbOfRounds.restore();
  });

  it(['can get Number Of Rounds(1000)', public_flag].join(''), function() {
    assert(Game.getNbOfRounds() === 1000);
  });

  it(['start should be an function of get Object', public_flag].join(''), function() {
    Game.start.should.be.a('function');
  });

  it(['can call start',  public_flag].join(''), function() {
    const callback =  sinon.stub(Game, 'start').returns(true);
    expect(Game.start()).to.equal(true);
    Game.start.restore();
  });

  it('should call _fight when calling start', function() {
    const _fight = sinon.spy(Game, '_fight');
    Game.start();
    sinon.assert.calledOnce(_fight);
  });
});