// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction


//  ===========================================================
"use strict";

//  ===========================================================
//====CONSTRUCTOR
class Particle {

    constructor(xStart, yStart, color) {//(number, number, color)

        //  vectors
        this.pos = createVector(xStart, yStart);
        this.vel = createVector(0.0, 0);
        this.acc = createVector(0.0, 0);
        this.force = createVector(1, 1); // does the starting value matter?

        //floats
        this.mass = random(3, 5);//3-10
        this.initialMass = this.mass;// constant scalar reference
        this.limit = random(7, 10);//limits velocity - limits the distance - great to control
        // this.limit = 5;//limits velocity

        //color
        this.color = color;// could be static since I am using the same for all
    }

    applyForce() {
        // we make a copy so that the original force is not affected since we need to reuse it// not really
        // let f = this.force.copy();
        // f.div(this.mass);
        // this.acc.add(f);

        // this seems to work as fine
        this.force.div(this.mass);
        this.acc.add(this.force);
    }

    //  -----------------------------------
    update() {

        this.vel.add(this.acc);
        this.vel.limit(this.limit);
        let storeVel2 = p5.Vector.mult(this.vel, Particle.elapsed);
        this.pos.add(storeVel2);
        this.acc.mult(0);// here multiplied by 0 in order to reset to (0,0)
    }

    //  -----------------------------------
    display() {
        stroke(0);
        strokeWeight(0);
        // fill(255, 127);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.mass
            * Particle.scalM, this.mass * Particle.scalM);
    }
}

//-------------------------------------
//====STATIC PROPERTIES
Particle.scalM = 0.5; //scale mass / only display, not calculations
Particle.elapsed = 1;
Particle.nbPtcls = 0; //Particle in each array of particles;
Particle.arr = [];// Particle.arr = [ [],[],[], ... ]
