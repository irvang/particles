// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

//  A force is a vector that causes an object with mass to accelerate
// 1st law   an object in rest stays in rest, an object in motion stays in motion
//  3rd law - for every action there's an opposite reaction
//  force = mass * acceleration ; A = F/M ; if M = 1 , then A = F

//  ===========================================================
"use strict";

//  ===========================================================
//====CONSTRUCTOR
class Attractor {
    //(number, number, number, number, color)
    constructor(x, y, mass, gravity, color) {

        //  Mass and gravity work together. I am setting gravity to a constant and using mass as the only decisive factor. Gravity and mass are only used to calculate attraction() for calculations, mass is used also in display() and update()
        this.mass = mass;
        this.initialMass = mass;// a scalar reference, a constant
        // this.grav = _gravity;//not used at the moment
        this.rAcc = 4; // limits of acceleration(random rAcc,random -rAcc) - good for control
        this.rVel = 5;  // limits of random velocity

        //vectors
        this.pos = createVector(x, y);
        this.acc = createVector(random(-this.rAcc, this.rAcc), random(-this.rAcc, this.rAcc));
        this.vel = createVector(random(-this.rVel, this.rVel), random(-this.rVel, this.rVel));

        //util-floats
        this.count = 0; // counts for the shifts in direction in update// 
        this.counterShift = random(30, 60);

        this.color = color;    //color
    }

    calculateAttraction  (p) { // attractor and particle objects (type: particle)
        // generates a force, returns vector force = (x,y);

        // Calculate direction of force
        p.force = p5.Vector.sub(this.pos, p.pos); //2d vector

        // Distance between objects
        // get the lenght (magnitude) of the vector
        let distance = p.force.mag(); //2d vector / see footnote

        // Artificial constraint
        distance = constrain(distance, 2, 8);//constrain(n,low,high) n=numberToConstrain

        // Normalize vector (distance doesn't matter here, we just want this vector for direction)
        p.force.normalize();

        // Calculate gravitional force magnitude
        let strength = (this.mass * p.mass) / (distance * distance);
        // var strength = (this.grav * this.mass * part.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        p.force.mult(strength);
        // this.calculatedthis.force = this.force;
        // p.force = force;
    }

    //  --------------------------------------------------------
    update  () {

        // this counter decides when to do a shift in direction
        if (this.count >= this.counterShift - 1) {
            this.acc = createVector(random(-this.rAcc, this.rAcc), random(-this.rAcc, this.rAcc));
            this.counterShift = random(15, 240);//defines how many counts until next shift
        }

        this.vel.add(this.acc); // add acceleration to velocity

        //constrains a value between a minimum and a maximum value/ I guess limit and constrain have the same use here
        // this.vel.x = constrain(this.vel.x, -this.rAcc, this.rAcc);// constrain so that is does not go crazy fast
        // this.vel.y = constrain(this.vel.y, -this.rAcc, this.rAcc);

        //this seems to work best
        this.vel.limit(this.rAcc);//limited by maximum size of acceleration
        // console.log(this.vel.x.toFixed(1) + ' ' + this.vel.y.toFixed(1));


        let storeVel = p5.Vector.mult(this.vel, Attractor.elapsed);

        this.pos.add(storeVel);
        this.acc.mult(0);  //  we reset to 0,0

        this.count++;
        this.count = this.count % this.counterShift;
    };

    //  --------------------------------------------------------
    displayIt  () {
        ellipseMode(CENTER);
        strokeWeight(0);
        stroke(0);
        fill(this.color);
        if (lstnrs.toggle1) {//this lstnr as class property
            ellipse(this.pos.x, this.pos.y, this.mass * Attractor.scalM, this.mass * Attractor.scalM);
        }
    }
    //  --------------------------------------------------------
    edges  () {
        //  used for attractor, could also be used for particle
        //  needs improving - put object at collision point
        //maybe use radius for limitÍ
        if ((this.pos.y + this.mass) > g.myHeight) {
            this.vel.y *= -1;
            this.pos.y = g.myHeight - this.mass;
        }

        if ((this.pos.y - this.mass) < 0) {
            this.vel.y *= -1;
            this.pos.y = this.mass;
        }

        if ((this.pos.x + this.mass) > g.myWidth) {
            this.vel.x *= -1;
            this.pos.x = g.myWidth - this.mass;
        }

        if ((this.pos.x - this.mass) < 0) {
            this.vel.x *= -1;
            this.pos.x = this.mass;
        }
    }
}

//-------------------------------------
//====STATIC PROPERTIES
//time elapsed since last frame. We are equalling 60 frames per second, to ms. whenever time is polled it will be equivalent to (60 * vel * elapsed), elapsed being equal to (newTime - oldTime )/ 1000 (approx 16.6ms , which is 60fps)
Attractor.elapsed = 1;
Attractor.scalM = 1;// scalar for size of eclipse() / only display at the moment
Attractor.nbAtrctr = 1;//Attractor.numberOfAttractors = 0;
Attractor.arr = [];




/* // Static method
    * var v1 = createVector(2, 3, 4);
    * var v2 = createVector(1, 2, 3);
    *
    * var v3 = p5.Vector.sub(v1, v2);
    v3 has compnents [1, 1, 1]

        	/// *Normalization* means to scale the vector so that its length
	/// (magnitude) is exactly 1, at which stage all that is left is the
	/// direction. A normalized vector is usually called a *unit vector*, and
    /// can be used to represent a pure direction (heading).

    */


/*




if((b.x + b.radius) > w) {

  // the ball hit the right wall
  // change horizontal direction
  b.speedX = -b.speedX;

  // put the ball at the collision point
  b.x = w - b.radius;

} else if((b.x -b.radius) < 0) {

  // the ball hit the left wall
  // change horizontal direction
  b.speedX = -b.speedX;

  // put the ball at the collision point
  b.x = b.radius;
}
*/