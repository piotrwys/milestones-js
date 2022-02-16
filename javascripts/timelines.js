(function() {
	'use strict';
  
	var Timelines = function(container, min, max, data) {
		this.data = [];
		this.startPeriod = new Period(min);
		this.endPeriod = new Period(max);
		this.stars = 0;
		this.checkouts = 0;
		this.widthMonth = 0;
		
		this.parse(data || []);
		this.periods = new Periods(this.startPeriod, this.endPeriod);		
		
		if (typeof document !== 'undefined') {
			this.container = (typeof container === 'string') ? document.querySelector('#'+container) : container;
			this.drawSections();
			this.container.style.width= [(this.periods.getMonths()) * this.widthMonth, 'px'].join('');
			this.drawDataLines();
			this.drawStars();
			this.drawCheckOuts();
		};
	
	};

	Timelines.prototype.parse = function(data) {
		for (var n = 0, m = data.length; n<m; n++) {
			var beg = new Period(data[n]['start']);
			var end = new Period(data[n]['end']);
			var lbl = data[n]['label'];
			var cat = data[n]['category'];
			var ded = parseInt(data[n]['dedicated']);
			var done = parseInt(data[n]['completed']);
			
			if (beg.getValue() < this.startPeriod.getValue()) {
				this.startPeriod = beg;
			}

			if (end.getValue() > this.endPeriod.getValue()) {
				this.endPeriod = end;
			} else if (beg.getValue() > this.endPeriod.getValue()) {
				this.endPeriod = beg;
			}
			
			this.data.push({start: beg, end: end, label: lbl, type: cat, inline: ded, completed: done});
		}
	};
	
	Timelines.prototype.drawSections = function() {
		var html = [];
		var y = this.startPeriod.year;
		var m = this.startPeriod.month + 1;

		for (var c = 1; c <= this.periods.getMonths(); c++) {
			html.push('<section><section-label>' + y + '/' + (m >= 10 ? m : '0' + m) + '</section-label></section>');
			m++;
			if (m > 12) {
				m = 1;
				y++;
			}
		};

		this.container.className = 'timelines color-scheme-default';
		this.container.innerHTML = '<div class="scale">' + html.join('') + '</div>';
		this.widthMonth = this.container.querySelector('.scale section').offsetWidth;
	};
	
	
	Timelines.prototype.drawDataLines = function() {
		var html = [];
		var widthMonth = this.container.querySelector('.scale section').offsetWidth;
		var li = '';
		var li_done = '';
		var prev_inline = 9;
		var inline_count = 0;
	
		for (var n = 0, m = this.data.length; n < m; n++) {
			var dataPoint = this.data[n];
			var dataLine = this.createDataLine(widthMonth, this.startPeriod, dataPoint.start, dataPoint.end);
			
			if (n != 0 && dataPoint.inline == 0) {
				html.push('<li>' + li + '</li>');
			}
			
			if (dataPoint.inline == 0) {
				li = '';
				inline_count = 0;
			}
			
			if (!isNaN(dataPoint.start.getValue())) {
				if (dataPoint.completed > 0) {
					this.checkouts++;
					li_done = [
						'<span style="z-index:'+ (inline_count + 1) +';top: 2px; width: 14px; left: 4px;" class="checkout">',
						'<canvas width=14 height=14 class="checkout" id="checkout' + this.checkouts + '"></canvas>',
						'</span>'
					].join('');
				} else {
					li_done = '';
				};
				li = li + [
					'<span style="z-index:'+inline_count+'; left:' + dataLine.getStartOffset() + 'px; width: ' + dataLine.getWidth() + 'px;" class="bubble bubble-' + (dataPoint.type || 'default') + '">',
					li_done,
					'<span z-index:'+inline_count+';" class="label label-' + (dataPoint.type || 'default') + '">' + dataPoint.label + '</span>',
					'</span>'
				].join('');
			} else {
				this.stars++;
				li = li + [
					'<span style="z-index:'+inline_count+'; left: ' + (dataLine.getEndOffset() - 8) + 'px; width: 60px" class="bubble">',
					'<canvas width=18 height=18 class="star" id="star' +this.stars + '"></canvas>',
					'<span class="label-star">' + dataPoint.label + '</span>',
					'</span>'
					].join('');
			};
	
			prev_inline = dataPoint.inline;
			
			inline_count=inline_count+dataLine.getMonths();
		}
		html.push('<li>' + li + '</li>');

		this.container.innerHTML += '<ul class="data">' + html.join('') + '</ul>';
		
		var inputs = this.container.getElementsByClassName('bubble');
		for(var i = 0; i < inputs.length; i++) {
			var j = inputs[i].lastChild.scrollHeight;
			inputs[i].style.height = j + "px";
			if (this.data[i].inline == 0) {
				inputs[i].parentElement.style.height = j + "px";
			} else {
				inputs[i].parentElement.style.height = Math.max(parseInt(inputs[i].parentElement.style.height), parseInt(j)) + "px";
			}
		}
	};
	
	Timelines.prototype.drawStars = function() {
		for(var c = 1; c <= this.stars; c++) {
			new Star('star'+c,8,8,5,8,4);
		}
	}

	Timelines.prototype.drawCheckOuts = function() {
		for(var c = 1; c <= this.checkouts; c++) {
			new CheckOut('checkout'+c,10,10);
		}
	}
	
	Timelines.prototype.createDataLine = function(wMonth, min, start, end) {
		return new DataLine(wMonth, min, start, end);
	};
	
	var DataLine = function(wMonth, min, start, end) {
		this.min = min;
		this.start = start;
		this.end = end;
		this.widthMonth = wMonth;
	};
	
	DataLine.prototype.getStartOffset = function() {
		var periods = new Periods(this.min, this.start);
		return Math.round(this.widthMonth) * (periods.getMonths() - 1) + (this.widthMonth / this.start.daysInMonth() * (this.start.getDay() - 1));
	};

	DataLine.prototype.getEndOffset = function() {
		var periods = new Periods(this.min, this.end);
		return Math.round(this.widthMonth) * (periods.getMonths()) - (this.widthMonth / this.end.daysInMonth() * (this.end.daysInMonth() - this.end.getDay()));
	};

	DataLine.prototype.getMonths = function() {
		var periods = new Periods(this.start, this.end);
		return periods.getMonths();
	};
	
	DataLine.prototype.getWidth = function() {
		var periods = new Periods(this.start, this.end);
		return Math.round((this.widthMonth * this.getMonths()) - 
				(this.widthMonth / this.start.daysInMonth() * (this.start.getDay() - 1)) - 
				(this.widthMonth / this.end.daysInMonth() * (this.end.daysInMonth() - this.end.getDay()))
				);
	};
	
	window.Timelines = Timelines;
  
})();;