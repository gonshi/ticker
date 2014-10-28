( function( global, doc, $, ns ) {
  'use strict';
  ns = ns || {};

  $( function() {
    var ticker = ns.Ticker.getInstance();
    var $runTime = $( '.runTime' );
    var $delta = $( '.delta' );
    var $fps = $( '.fps' );

    /*----------------------------------
      PRIVATE 
    ----------------------------------*/
    function _setup() {
      ticker.listen( 'tick', function( e ) {
        $runTime.text( e.runTime );
        $delta.text( e.delta );
        $fps.text( e.measuredFPS );
        //console.log( e.delta );
        //console.log( e.runTime );
        //_update( e.delta );
        //_draw();
      });
    }

    /*
    function _update( delta ){
      console.log( delta );
    }

    function _draw( fps ){
      console.log( fps );
    }*/

    /*----------------------------------
      INIT
    ----------------------------------*/
    _setup();
    ticker.setFPS( 60 );
  });

  global.namespace = ns;
})( this, document, jQuery, this.namespace );
