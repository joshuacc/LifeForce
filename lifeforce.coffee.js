# Initialize world canvas

l_canvas = document.getElementById "life"
l_context = l_canvas.getContext "2d"

f_canvas = document.getElementById "force"
f_context = f_canvas.getContext "2d"

l_context.fillStyle = "#fff"
l_context.fillRect 0, 0, 640, 360

f_context.fillStyle = "#808080"
f_context.fillRect 0, 0, 640, 360

refresher = null

runvisualization = ->

	# Initialize a 2d array
	# False represents a "dead" cell, while true represents a "live" cell
	world =
		for x in [0..639]
			for y in [0..359]
				randomnum = Math.floor(Math.random() * 2)
				!!randomnum

	# Paint the initial world state
	drawworld = ->
		for x in [0..639]
			for y in [0..359]
				if world[x][y] == true
					f_context.fillStyle = "rgba(255,255,255,0.0041)"
					l_context.fillStyle = "#000"
				else
					f_context.fillStyle = "rgba(0,0,0,0.041)"
					l_context.fillStyle = "#fff"

				l_context.fillRect x, y, 1, 1

				f_context.fillRect x, y, 1, 1

	drawworld()

	countneighbors = (x,y) ->
		total = 0

		if x == 0 then westindex = 639
		else westindex = x - 1

		if x == 639 then eastindex = 0
		else eastindex = x + 1

		if y == 0 then northindex = 359
		else northindex = y - 1

		if y == 359 then southindex = 0
		else southindex = y + 1

		if world[westindex][northindex] == true then total++
		if world[x][northindex]         == true then total++
		if world[eastindex][northindex] == true then total++
		if world[westindex][y]          == true then total++
		if world[eastindex][y]          == true then total++
		if world[westindex][southindex] == true then total++
		if world[x][southindex]         == true then total++
		if world[eastindex][southindex] == true then total++

		total

	incrementworld = ->
		# Deep copy of the world state
		newworld = 
			for x in [0..639] 
				for y in [0..359]
					world[x][y]
		
		# Run Conway's rules over each cell
		for x in [0..639]
			for y in [0..359]
				neighbors = countneighbors x, y

				if world[x][y] == true
					unless neighbors == 2 or neighbors == 3 then newworld[x][y] = false
				else
					if neighbors == 3 then newworld[x][y] = true

		# Update world with deep copy of new state
		world = 
			for x in [0..639] 
				for y in [0..359]
					newworld[x][y]

	stepforward = ->
		incrementworld()
		drawworld()


	refresher = setInterval stepforward, 250


playbutton = document.getElementById 'play'
playbutton.onclick = -> runvisualization()

stopbutton = document.getElementById 'stop'
stopbutton.onclick = -> clearInterval refresher

savebutton = document.getElementById 'save'
savebutton.onclick = -> 
	window.open f_canvas.toDataURL(), "canvasImage", "left=0,top=0,width=#{f_canvas.width},height=#{f_canvas.height},toolbar=0,resizable=0"