# Initial setup

l_canvas = document.getElementById "life"
l_context = l_canvas.getContext "2d"

l_context.fillStyle = "#fff"
l_context.fillRect 0, 0, 640, 360

# Initialize a 2d array
# False represents a "dead" cell, while true represents a "live" cell
l =
	for x in [0..639]
		for y in [0..359]
			randomnum = Math.floor(Math.random() * 2)
			!!randomnum

console.log l

