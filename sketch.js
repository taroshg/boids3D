let flock = new Flock();

function setup() 
{
	createCanvas(windowWidth, windowHeight, WEBGL);
	flock.add(50)
}

function draw() 
{
	orbitControl()
	background(25);
	flock.run()
}
