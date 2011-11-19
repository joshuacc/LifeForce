# A visualization of Conway's Game of Life over time, implemented with Canvas and CoffeeScript.

Live page: http://joshuacc.github.com/LifeForce/
       
The two canvases represent two visualizations of the same data. The first is the classic Game of Life, seeded randomly. The second visualizes the "force" of life (or death) over time.

At each step, the presence of a live cell brightens the corresponding pixel, while a dead cell darkens it. Over time this results in an image depicting where life has been able to flourish.