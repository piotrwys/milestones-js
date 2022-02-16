(function() {
  'use strict';

  /**
   * Initialize a Star
   */
  var Star = function(canvas, cx,cy,spikes,outerRadius,innerRadius) {
	if (typeof document !== 'undefined') {
	  this.canvas = (typeof canvas === 'string') ? document.querySelector('#'+canvas) : canvas;
	  this.drawStar(cx,cy,spikes,outerRadius,innerRadius);
	}
  };
  
  /**
  * Draw a Star
  */
  Star.prototype.drawStar = function (cx,cy,spikes,outerRadius,innerRadius){
	var ctx=this.canvas.getContext("2d");
	var rot=Math.PI/2*3;
	var x=cx;
	var y=cy;
	var step=Math.PI/spikes;
	
	ctx.beginPath();
	ctx.moveTo(cx,cy-outerRadius);
	
	for(var i=0;i<spikes;i++){
		x=cx+Math.cos(rot)*outerRadius;
		y=cy+Math.sin(rot)*outerRadius;
		ctx.lineTo(x,y);
		rot+=step;

		x=cx+Math.cos(rot)*innerRadius;
		y=cy+Math.sin(rot)*innerRadius;
		ctx.lineTo(x,y);
		rot+=step;
	};
	ctx.lineTo(cx,cy-outerRadius);
	ctx.closePath();
	/* ctx.lineWidth=5;
	ctx.strokeStyle='blue';
	ctx.stroke(); */
	ctx.fillStyle='red';
	ctx.fill();

  };
  
  window.Star = Star;
})();