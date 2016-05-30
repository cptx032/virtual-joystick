# virtual-joystick
A lightweight virtual HTML5/Javascript mobile joystick

![Virtual joystick](https://raw.githubusercontent.com/cptx032/virtual-joystick/master/examples/screenshot.png)

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
