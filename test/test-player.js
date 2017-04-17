const
  {assert, expect, should} = require('chai'),
  sinon = require('sinon'),
  requirejs = require('requirejs'),
  random = require('random-js'),
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

const Player = requirejs('player');

describe('Player', function() {
  describe('Play', function() {
    it(['should be an object', public_flag].join(''), function() {
      Player.should.be.an('object');
    });
    it(['should be an function of get Object' + public_flag].join(''), function() {
      Player.play.should.be.a('function');
    });
    it(['\'Paper\' returns \'Paper\'',  public_flag].join(''), function() {
      expect(Player.play('Paper')).to.equal('Paper');
    });
    it(['\'paper\' returns \'Paper\'',  public_flag].join(''), function() {
      expect(Player.play('papeR')).to.equal('Paper');
    });
    it(['\'paPer\' returns \'Paper\'',  public_flag].join(''), function() {
      expect(Player.play('paPeR')).to.equal('Paper');
    });
    it(['can not let a player play an empty string',  public_flag].join(''), function() {
      const choice = 'Scissors';
      expect(Player.play('')).not.to.equal('');
    });
    it(["randomly will get a valid choice in 'Paper', 'Rocks', 'Scissors'",  public_flag].join(''), function() {
      const choice = Player.play();
      const choices = ['Paper', 'Rock', 'Scissors'];
      expect(choices.indexOf(choice)).not.to.equal(-1);
    });
    it(['triggers random shuffle',  public_flag].join(''), function() {
      const shuffle = sinon.spy(random, 'shuffle');
      Player.play();
      assert(shuffle.calledOnce);
      random.shuffle.restore();
    });
    it(['randomly will get a valid a random choice',  public_flag].join(''), function() {
      const callback =  sinon.stub(random, 'shuffle').returns(['test', 'test1', 'test2']);
      expect(Player.play()).to.equal('test');
      random.shuffle.restore();
    });
  });

  describe('Random', function() {
    it(['random.engines is an object',  public_flag].join(''), function(){
      assert.typeOf(random.engines, 'object');
    });
    it(['random.engines has an nativeMath engine',  public_flag].join(''), function(){
      assert.property(random.engines, 'nativeMath');
    });
    it(['random.engines nativeMath is a function',  public_flag].join(''), function(){
      assert.typeOf(random.engines.nativeMath, 'function');
    });
    it(['has an math engine',  public_flag].join(''), function(){
      const engine = 'test random engine';
      sinon.stub(random.engines, 'nativeMath').returns(engine);
      expect(random.engines.nativeMath()).to.equal(engine);
      random.engines.nativeMath.restore();
    });
    it(['can call the random shuffle function',  public_flag].join(''), function() {
      const spy = sinon.spy();
      const proxy = random.shuffle(random.engines.nativeMath, spy);
      proxy();
      assert(spy.called);
    });
    it(['random shuffle returns choose a random choice',  public_flag].join(''), function() {
      const choices = ['Paper', 'Rock', 'Scissors'];
      choices_random = random.shuffle(random.engines.nativeMath, choices);
      const [choice] = [...choices_random];
      expect(choices.indexOf(choice)).not.to.equal(-1);
    });
  });
});