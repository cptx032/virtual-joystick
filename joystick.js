// author: Willie Lawrence
// contact: cptx032 arroba gmail dot com
// based in https://github.com/jeromeetienne/virtualjoystick.js/blob/master/virtualjoystick.js

var JoyStick = function( attrs ) {
	this.radius = attrs.radius || 50;
	this.x = attrs.x || 0;
	this.y = attrs.y || 0;
};

JoyStick.prototype.left = false;
JoyStick.prototype.right = false;
JoyStick.prototype.up = false;
JoyStick.prototype.down = false;

JoyStick.prototype.__is_up = function ( dx, dy )
{
	if( dy >= 0 )
	{
		return false;
	}
	if( Math.abs(dx) > 2*Math.abs(dy) )
	{
		return false;
	}
	return true;
};

JoyStick.prototype.__is_down = function down( dx, dy )
{
	if( dy <= 0 )
	{
		return false;
	}
	if( Math.abs(dx) > 2*Math.abs(dy) )
	{
		return false;
	}
	return true;	
};

JoyStick.prototype.__is_left = function( dx, dy )
{
	if( dx >= 0 )
	{
		return false;
	}
	if( Math.abs(dy) > 2*Math.abs(dx) )
	{
		return false;
	}
	return true;	
};

JoyStick.prototype.__is_right = function( dx, dy )
{
	if( dx <= 0 )
	{
		return false;
	}
	if( Math.abs(dy) > 2*Math.abs(dx) )
	{
		return false;
	}
	return true;	
};

JoyStick.prototype.create_over_canvas = function()
{
	this.div = document.createElement('div');
	var div_style = this.div.style;
	div_style.width = '100%';
	div_style.height = '100%';
	div_style.background = 'rgba(255,255,255,0)';
	div_style.position = 'absolute';
	div_style.top = '0px';
	div_style.margin = '0px';
	div_style.padding = '0px';
	div_style.position = 'absolute';
	div_style.overflow = 'hidden';
	document.body.appendChild( this.div );
	///////////////////////////////////////////
	this.base = document.createElement('span');
	div_style = this.base.style;
	div_style.width = this.radius * 2 + 'px';
	div_style.height = this.radius * 2 + 'px';
	div_style.position = 'absolute';
	div_style.top = this.y - this.radius + 'px';
	div_style.left = this.x - this.radius + 'px';
	div_style.borderRadius = '50%';
	div_style.borderColor = 'rgba(200,200,200,0.5)';
	div_style.borderWidth = '1px';
	div_style.borderStyle = 'solid';
	this.div.appendChild( this.base );
	///////////////////////////////////////////
	this.control = document.createElement('span');
	div_style = this.control.style;
	div_style.width = this.radius / 2 + 'px';
	div_style.height = this.radius / 2 + 'px';
	div_style.position = 'absolute';
	div_style.top = this.y - (this.radius/4) + 'px';
	div_style.left = this.x - (this.radius/4) + 'px';
	div_style.borderRadius = '50%';
	div_style.backgroundColor = 'rgba(200,200,200,0.3)';
	div_style.borderWidth = '1px';
	div_style.borderColor = 'rgba(200,200,200,0.8)';
	div_style.borderStyle = 'solid';
	this.div.appendChild( this.control );
	///////////////////////////////////////////
	var self = this;
	// the event is binded in all the screen
	// to captures fast movements
	function touch_hander( evt )
	{
		var touch_obj = evt.changedTouches[0];
		self.control.style.left = touch_obj.clientX - (self.radius/4) + 'px';
		self.control.style.top = touch_obj.clientY - (self.radius/4) + 'px';

		var dx = touch_obj.clientX - self.x;
		var dy = touch_obj.clientY - self.y;
		self.up = self.__is_up( dx, dy );
		self.down = self.__is_down( dx, dy );
		self.left = self.__is_left( dx, dy );
		self.right = self.__is_right( dx, dy );
	}
	function clear_flags()
	{
		self.left = false;
		self.right = false;
		self.up = false;
		self.down = false;

		self.control.style.top = self.y - (self.radius/4) + 'px';
		self.control.style.left = self.x - (self.radius/4) + 'px';
	}
	this.base.addEventListener('touchmove', touch_hander, false);
	this.base.addEventListener('touchstart', touch_hander, false);
	this.base.addEventListener('touchend', clear_flags, false);
	this.control.addEventListener('touchmove', touch_hander, false);
	this.control.addEventListener('touchstart', touch_hander, false);
	this.control.addEventListener('touchend', clear_flags, false);
};