/**
 * Scroll widget
 *
 * Params:
 * 	height-> Scoll height each pace
 * 	num -> The value use for scrollTo('bottom')
 *  
 * @author lyz
 * @email 702368372@qq.com
 */
define(['jquery', 'hash', 'events'], function($, hash, events){
	function _Scroll(config){
		var defaults = {
			height: 640,
			init: 0,
			num: 3,
			hook: null
		};
		this.config = $.extend({}, defaults, config);
		this.scrollEle = window.VBArray ? 'html' : 'body';
		this.scrolling = false;
		this.index = this.config.init;
		this.jumpTo(this.config.init);
	}
	
	_Scroll.prototype.down = function(callback, force){
		var me = this;
		if(!force && me.config.hook.down){
			if(!me.config.hook.down()){
				return false;
			}
		}

		var reachBottom = $(document).scrollTop()  == $(document).height() - $(window).height();
		if(!reachBottom){
			me.scrolling = true;

			$(me.scrollEle).animate({
				'scrollTop': '+='+me.config.height
			}, 'slow', function(){
				me.scrolling = false;
				me.index++;
				hash('index', me.index);
				events.emit('scroll', me.index);
				callback && callback();
			})
		}
	}
	_Scroll.prototype.up = function(callback){
		var me = this;
		if(me.config.hook.up){
			if(!me.config.hook.up()){
				return false;
			}
		}
		var reachTop = !$(document).scrollTop();
		if(!reachTop){
			me.scrolling = true;

			$(me.scrollEle).animate({
				'scrollTop': '-='+me.config.height
			}, 'slow', function(){
				me.scrolling = false;
				me.index--;
				hash('index', me.index);
				events.emit('scroll', me.index);
				callback && callback();
			})
		}
	}
	_Scroll.prototype.scrollTo = function(index, callback){
		var me = this;
		me.scrolling = true;

		if(index == 'bottom'){
			index = me.config.num - 1;
		}
		$(me.scrollEle).animate({
			'scrollTop': index * me.config.height
		}, 'slow', function(){
			me.scrolling = false;
			me.index = index;
			hash('index', me.index);
			events.emit('scroll', me.index);
			callback && callback();
		})
	}
	_Scroll.prototype.jumpTo = function(index){
		var me = this;

		if(index == 'bottom'){
			index = me.config.num - 1;
		}

		$(me.scrollEle).scrollTop(index * me.config.height);
		me.index = index;
		hash('index', me.index);
		events.emit('scroll', me.index);
	}
	_Scroll.prototype.getIndex = function(){
		return this.index;
	}
	return _Scroll;
})