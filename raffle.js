/**
 * Raffle widget
 *
 * Params:
 * 	cursor-> The selector of the element to run
 * 	classes-> The classes which cursor switches between
 *  rates-> `asc` and `des`.Fromular to calculate cursor speed
 *  maxSpeed-> The maxnum speed cursor runs 
 *  minSpeed-> The mininum speed cursor runs
 *  stopAt -> The position which cursor finaly stop at
 *  after -> Callback when raffle finishs
 *  
 * @author lyz
 * @email 702368372@qq.com
 */
define(['jquery'], function($){
	function Raffle(config){
		var defaults = {
			cursor: '.cursor_',
			classes: ['cursor', 'cursor1', 'cursor2', 
					  'cursor3', 'cursor4', 'cursor5',
					  'cursor6', 'cursor7' ],
			rates: {
				asc: function(num){return num/1.07},
				des: function(num){return num*1.10}
			},
			maxSpeed: 90,
			initSpeed: 200,
			maxSpeedDuration: 1500,
			minSpeed: 200,
			stopAt: 0,
			after: null
		}
		this.config = $.extend({}, defaults, config);
		this.cursor = $(this.config.cursor);
		this.index = 0;
		this.curSpeed = this.config.initSpeed;
		this.maxSpeedDuration = 0;
		this.running = false;
	}
	Raffle.prototype.run = function(){
		var me = this;
		if(me.running) return;

		me.running = true;
		me.cursor.show();
		setTimeout(function(){
			me._asc();
		}, 200)
	}
	// Raffle.prototype.run = function(){
	// 	var me = this;
	// 	me.config.after && me.config.after();
	// }

	Raffle.prototype._asc = function(){
		var me = this;
		
		me.switchClass();
		me.curSpeed = me.config.rates.asc(me.curSpeed);
		//console.log('asc:'+ me.curSpeed);
		if(me.curSpeed > me.config.maxSpeed){
			me.ascTimer = setTimeout(function(){
				me._asc();
			}, me.curSpeed);
		}else{
			// Finish ascend, turn to uniform
			clearTimeout(me.ascTimer);
			me._uniform();
		}
		
	}

	Raffle.prototype._uniform = function(){
		var me = this;

		me.switchClass();
		//console.log('uniform:'+ me.config.maxSpeed);
		if(me.maxSpeedDuration < me.config.maxSpeedDuration){
			me.maxSpeedDuration += me.config.maxSpeed
			me.uniformTimer = setTimeout(function(){
				me._uniform();
			}, me.config.maxSpeed);
		}else{
			// Finish uniform, turn to descend
			me._des();
		}
		
	}
	Raffle.prototype._des = function(){
		var me = this;
		me.switchClass();
		//console.log('des:'+ me.curSpeed);
		if(me.curSpeed < me.config.minSpeed){
			me.curSpeed = me.config.rates.des(me.curSpeed);
		}else{
			// Finish ascend, turn to uniform
			if(me.index === me.config.stopAt){
				me.config.after && me.config.after();
				me.running = false;
				return;
			}
			
		}
		me.desTimer = setTimeout(function(){
			me._des();
		}, me.curSpeed);
	}

	/**
	 * Swith to a certain class
	 */
	Raffle.prototype.switchClass = function(){
		var me = this;
		me.index = (++me.index) % me.config.classes.length;
		me.cursor.removeClass(me.config.classes.join(' '))
				 .addClass(me.config.classes[me.index]);
		// console.log(me.config.classes[me.index]);
	}

	Raffle.prototype.isRunning = function(){
		return this.running;
	}
	return Raffle;
})