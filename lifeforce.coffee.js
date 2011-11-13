# Initialize world canvas

l_canvas = document.getElementById "life"
l_context = l_canvas.getContext "2d"

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
				l_context.fillStyle = "#000"
			else
				l_context.fillStyle = "#fff"
			l_context.fillRect x, y, 1, 1

drawworld()

countneighbors = (x,y) ->
	total = 0

	if x == 0 then westindex = 639
	else westindex = x - 1
	console.log "westindex = " + westindex

	if x == 639 then eastindex = 0
	else eastindex = x + 1
	console.log "eastindex = " + eastindex

	if y == 0 then northindex = 359
	else northindex = y - 1
	console.log "northindex = " + northindex

	if y == 359 then southindex = 0
	else southindex = y + 1
	console.log "southindex = " + southindex

	if world[westindex][northindex] == true then total++
	if world[x][northindex]         == true then total++
	if world[eastindex][northindex] == true then total++
	if world[westindex][y]          == true then total++
	if world[x][y]                  == true then total++
	if world[eastindex][y]          == true then total++
	if world[westindex][southindex] == true then total++
	if world[x][southindex]         == true then total++
	if world[eastindex][southindex] == true then total++

	total

console.log countneighbors 0, 0

###
incrementworld = ->
	newworld = world
	for x in [0..639]
		for y in [0..359]
			neighbors = countneighbors x, y

			if world[x][y] == true
				unless neighbors == 2 or neighbors == 3 then newworld[x][y] = false
			else
				if neighbors == 3 then newworld[x][y] = true
###



