(function() {
	'use strict';

	var Period = function(period) {
		this.value = this.parseDate(period);
		this.year = this.value.getFullYear();
		this.month = this.value.getMonth();
		this.day = this.value.getDate();
		this.week = Math.trunc(this.value.getDate() / 8);
	};
  
	Period.prototype.getValue = function() {
		return this.value;
	};  

	Period.prototype.getDay = function() {
		return parseInt(this.day);
	};

	Period.prototype.getWeek = function() {
		return parseInt(this.week);
	};
	
	Period.prototype.getMonth = function() {
		return parseInt(this.month);
	};

	Period.prototype.daysInMonth = function() {
		return new Date(this.year, this.month+1, 0).getDate();
	}; 
	
	Period.prototype.getYear = function() {
		return parseInt(this.year);
	};
	
	Period.prototype.formatMonth = function(num) {
		num = parseInt(num, 10);
		return num >= 10 ? num : '0' + num;
	};  
  
	Period.prototype.parseDate = function(date) {
		if (date != NaN) {
			date = date.split('/');
			switch (date.length) {
				case 1:
					date = new Date(parseInt(date[0], 10), 1, 1);
					break;
				case 2:
					date = new Date(parseInt(date[1], 10), parseInt(date[0], 10)-1, 1);
					break;
				case 3:
					date = new Date(parseInt(date[2], 10), parseInt(date[1], 10)-1, parseInt(date[0], 10));
					break;
			};
		} else {
			date = NaN;
		}
		return date;
	};
  
	var Periods = function(period1, period2) {
		this.startPeriod = period1;
		this.endPeriod = period2;
	};
  
	Periods.prototype.getYears = function() {
		var min = new Date(Math.min(this.startPeriod.value, this.endPeriod.value));
		var max = new Date(Math.max(this.startPeriod.value, this.endPeriod.value));
		return max.getYear() - min.getYear();
	};
	
	Periods.prototype.getMonths = function() {
		var min = new Date(Math.min(this.startPeriod.value, this.endPeriod.value));
		var max = new Date(Math.max(this.startPeriod.value, this.endPeriod.value));
		var years = this.getYears();
		var months = 0;
		
		months += max.getMonth() - min.getMonth();
		months += 12 * years + 1;
		
		return months;
  };
  
  window.Period = Period;
  window.Periods = Periods;
  
  
})();