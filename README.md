# virtual-joystick
A lightweight virtual HTML5/Javascript mobile joystick

![Virtual joystick](https://raw.githubusercontent.com/cptx032/virtual-joystick/master/examples/screenshot.png)

See a running example here: http://vls2.tk/virtual-joystick/

To create a virtual joystick is very simple:
```javascript
// creates a centralized joystick
var joystick = new JoyStick({
	radius: 80,
	x: window.innerWidth / 2,
	y: window.innerHeight /2,
	inner_radius: 70
});
```
any time you want you can check the joystick status:
```javascript
function check() {
	requestAnimationFrame( check );
	
	if ( joystick.up ) {
		console.log( 'walk character' );
	}
}
check();
```

### Limitations
This project is just for very simple projects. It is not able to say the delta and configures the button's style, for example.
If you want you can checkout https://github.com/jeromeetienne/virtualjoystick.js for a more complete solution
