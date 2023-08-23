class Flock
{
    constructor()
    {
        this.boids = []
        this.visualRange = 100
        this.protectedRange = 30
        
        this.alignmentFactor = 0.1
        this.cohesionFactor = 0.01
        this.separationFactor = 1
    }

    add(n_boids)
    {
        for(let i = 0; i < n_boids; i++)
        {
            this.boids.push(new Boid(random(-width, width), random(-height, height), random(-400, 400)))
        }
    }

    run()
    {   
        for(let boid of this.boids){
            let alignment = createVector(0, 0, 0)
            let cohesion = createVector(0, 0, 0)
            let separation = createVector(0, 0, 0)
            let n_other = 0
            for (let other of this.boids){
                if (boid != other){
                    let distance = p5.Vector.dist(boid.pos, other.pos)
                    if (distance < this.visualRange)
                    {
                        alignment.add(other.vel)
                        cohesion.add(other.pos)
                        n_other += 1

                        if(distance < this.protectedRange)
                        {
                            separation.add(p5.Vector.sub(boid.pos, other.pos).div(distance))
                        }
                    }
                }
            }
            if (n_other > 0)
            {
                alignment.div(n_other).sub(boid.vel)
                cohesion.div(n_other).sub(boid.pos)
            }

            boid.vel.add(cohesion.mult(this.cohesionFactor))
            boid.vel.add(separation.mult(this.separationFactor))
            boid.vel.add(alignment.mult(this.cohesionFactor))

            // push()
            // translate(boid.pos.x, boid.pos.y, boid.pos.z)
            // fill(255, 2)
            // sphere(this.visualRange, 5, 5)
            // pop()

            boid.update()
        }
    }
}