class Boid
{
    constructor(x, y, z)
    {
        this.pos = createVector(x, y, z);
        this.vel = p5.Vector.random3D();
        this.r = 10
        this.minspeed = 4
        this.maxspeed = 5
        this.turnFactor = 1
    }

    edges(bound=400)
    {
        if (this.pos.x > bound + this.r) this.vel.x -= this.turnFactor;
        if (this.pos.x < -bound - this.r) this.vel.x += this.turnFactor;
        if (this.pos.y > bound + this.r) this.vel.y -= this.turnFactor;
        if (this.pos.y < -bound - this.r) this.vel.y += this.turnFactor;
        if (this.pos.z > bound + this.r) this.vel.z -= this.turnFactor;
        if (this.pos.z < -bound - this.r) this.vel.z += this.turnFactor;
    }


    update()
    {
        this.move()
        this.draw()  
        this.edges()    
    }

    draw()
    {   
        let dir = this.vel.copy().cross(createVector(0, 1, 0))
        let forward = createVector(0, 1, 0)
        let ang = p5.Vector.angleBetween(this.vel, createVector(0, 1, 0));
        push()
        translate(this.pos)
        fill(255, 140, 0)
        strokeWeight(0)
        rotate(ang > 0 ? -ang : ang, dir)
        cone(this.r, this.r * 2)
        pop()

        // push()
        // stroke(255);
        // line(0, 0, 0, 
        //      this.vel.x * 100, this.vel.y * 100, this.vel.z * 100)
        // stroke(0, 0, 255)
        // line(0, 0, 0, 
        //      dir.x * 100, dir.y * 100, dir.z * 100)
        // stroke(255, 0, 255)
        // line(0, 0, 0, 
        //     forward.x * 100, forward.y * 100, forward.z * 100)
        // pop()

    }
    move()
    {
        this.pos.add(this.vel)
        
        let speed = this.vel.mag()

        if (speed > this.maxspeed) this.vel.mult(this.maxspeed / speed);
        if (speed < this.minspeed) this.vel.mult(this.minspeed / speed);
    }
}