(function() {
  'use strict';

  /**
   * Initialize a CheckOut
   */
  var CheckOut = function(canvas, cx,cy) {
	if (typeof document !== 'undefined') {
	  this.canvas = (typeof canvas === 'string') ? document.querySelector('#'+canvas) : canvas;
	  this.drawCheckOut(cx,cy);
	}
  };
  
  /**
  * Draw a Star
  */
  CheckOut.prototype.drawCheckOut = function (cx,cy){
	var ctx=this.canvas.getContext("2d");
	
    ctx.beginPath();
    ctx.moveTo(0, cy/2);
	ctx.lineTo(cx/2, cy);
	ctx.lineTo(cx, 0);
	ctx.lineWidth = 3;
	ctx.strokeStyle='green';
    ctx.stroke();	

  };
  
  window.CheckOut = CheckOut;
})();