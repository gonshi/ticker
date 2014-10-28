( function( global, doc, $, ns ) {
  'use strict';
  ns = ns || {};  

  /*----------------------------------
    PRIVATE 
  ----------------------------------*/
  var instance;
  var fps = 60;

  function Ticker(){
    var _this = this;
    var e = {};
    var FRAME_RATE = 60;
    var DELTA      = 1000 / FRAME_RATE;

    var now             = Date.now();
    var startTime       = now;
    var prevTime        = now;
    var prevSecondTime  = now;

    var fps_counter = 0;

    this.events = [];
    e.measuredFPS = 60;

    setInterval( function(){
      var i;
      var _length = _this.events.length; 
      now = Date.now();
      e.runTime = now - startTime; 
      e.delta = now - prevTime; 
      prevTime = now;

      fps_counter += 1;
      if ( fps_counter === FRAME_RATE ){
        e.measuredFPS = FRAME_RATE * 1000 / ( now - prevSecondTime );
        prevSecondTime = now;
        fps_counter = 0;
      }

      for( i = 0; i < _length; i++ ){
        _this.events[ i ]( e );
      }
    }, DELTA );
  }

  Ticker.prototype.setFPS = function( _fps ){
    fps = _fps;
  };

  Ticker.prototype.listen = function( eventName, callback ){
    if ( eventName === 'tick' ){
      this.events.push( callback );
    }
  };

  /*----------------------------------
    PRIVATE 
  ----------------------------------*/
  function _getInstance(){
    if ( !instance ){
      instance = new Ticker();
    }
    return instance;
  }

  /*----------------------------------
    EXPORT ( Singleton ) 
  ----------------------------------*/
  ns.Ticker = {
    getInstance: _getInstance
  };

  global.namespace = ns;
})( this, document, jQuery, this.namespace );
