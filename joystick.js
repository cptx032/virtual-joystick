// author: Willie Lawrence
// contact: cptx032 arroba gmail dot com
// based in https://github.com/jeromeetienne/virtualjoystick.js/blob/master/virtualjoystick.js
var JOYSTICK_DIV = null;

function __init_joystick_div()
{
	JOYSTICK_DIV = document.createElement('div');
	var div_style = JOYSTICK_DIV.style;
	div_style.background = 'rgba(255,255,255,0)';
	div_style.position = 'absolute';
	div_style.top = '0px';
	div_style.bottom = '0px';
	div_style.left = '0px';
	div_style.right = '0px';
	div_style.margin = '0px';
	div_style.padding = '0px';
	div_style.borderWidth = '0px';
	div_style.position = 'absolute';
	div_style.overflow = 'hidden';
	div_style.zIndex = '10000';
	document.body.appendChild( JOYSTICK_DIV );
}
var JoyStick = function( attrs ) {
	this.radius = attrs.radius || 50;
	this.inner_radius = attrs.inner_radius || this.radius / 2;
	this.x = attrs.x || 0;
	this.y = attrs.y || 0;
	this.mouse_support = attrs.mouse_support || true;

	if ( attrs.visible === undefined )
	{
		attrs.visible = true;
	}

	if ( attrs.visible )
	{
		this.__create_fullscreen_div();
	}
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

JoyStick.prototype.__create_fullscreen_div = function()
{
	if ( JOYSTICK_DIV === null )
	{
		__init_joystick_div();
	}
	this.div = JOYSTICK_DIV;
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
	div_style.width = this.inner_radius * 2 + 'px';
	div_style.height = this.inner_radius * 2 + 'px';
	div_style.position = 'absolute';
	div_style.top = this.y - this.inner_radius + 'px';
	div_style.left = this.x - this.inner_radius + 'px';
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
		var touch_obj = evt.changedTouches ? evt.changedTouches[0] : evt;
		if ( self.mouse_support && !(touch_obj.buttons === 1) )
		{
			return;
		}
		self.control.style.left = touch_obj.clientX - self.inner_radius + 'px';
		self.control.style.top = touch_obj.clientY - self.inner_radius + 'px';

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

		self.control.style.top = self.y - self.inner_radius + 'px';
		self.control.style.left = self.x - self.inner_radius + 'px';
	}
	this.bind( 'touchmove', touch_hander );
	this.bind( 'touchstart', touch_hander );
	this.bind( 'touchend', clear_flags );
	if ( this.mouse_support )
	{
		this.bind( 'mousedown', touch_hander );
		this.bind( 'mousemove', touch_hander );
		this.bind( 'mouseup', clear_flags );
	}
};
JoyStick.prototype.bind = function( evt, func )
{
	this.base.addEventListener( evt, func );
	this.control.addEventListener( evt, func );
};

/*
attributes:
	+ x
	+ y
	+ func
	+ mouse_support
*/
var JoyStickButton = function( attrs )
{
	this.radius = attrs.radius || 50;
	this.x = attrs.x || 0;
	this.y = attrs.y || 0;
	this.text = attrs.text||'';
	this.mouse_support = attrs.mouse_support||false;
	if ( JOYSTICK_DIV === null )
	{
		__init_joystick_div();
	}
	this.base = document.createElement('span');
	this.base.innerHTML = this.text;
	div_style = this.base.style;
	div_style.width = this.radius * 2 + 'px';
	div_style.height = this.radius * 2 + 'px';
	div_style.position = 'absolute';
	div_style.top = this.y - this.radius + 'px';
	div_style.left = this.x - this.radius + 'px';
	div_style.borderRadius = '50%';
	div_style.backgroundColor = 'rgba(255,255,255,0.1)';
	div_style.borderWidth = '1px';
	div_style.borderColor = 'rgba(255,255,255,0.8)';
	div_style.borderStyle = 'solid';
	JOYSTICK_DIV.appendChild( this.base );

	if ( attrs.func )
	{
		if ( this.mouse_support )
		{
			this.bind( 'mousedown', attrs.func );
		}
		this.bind( 'touchstart', attrs.func );
	}

	var self = this;
	function __over()
	{
		div_style.backgroundColor = 'rgba(255,255,255,0.3)';
	}
	function __leave()
	{
		div_style.backgroundColor = 'rgba(255,255,255,0.1)';
	}
	self.bind( 'touchstart', __over );
	self.bind( 'touchend', __leave );
	if ( this.mouse_support )
	{
		self.bind( 'mousedown', __over );
		self.bind( 'mouseup', __leave );
	}
};
JoyStickButton.prototype.bind = function( evt, func )
{
	this.base.addEventListener( evt, func );
};
