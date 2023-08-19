// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

//  the problem is that the force is being changed constantly

//  ================================================================= 
//  Variables

"use strict";
g.canvas = {};

Attractor.nbAtrctr = 5; //var numberOfAttractors = 5;// testing at a=5, p=200
Particle.nbPtcls = 500; //var particlesPerAttractor = 200;// 400


g.attMass = 12;
g.randMass = 5;//  mass + 10.ranodm // 12, 5 is a good setting to start
g.attGravity = 1; // was random(0.5, 1)

//  ---------------
g.word = 0;
g.word2 = null;
g.initialTime = new Date();
g.oldTime = new Date();
g.newTime = new Date();// initialize to date to avoid error on first calculation 

g.myHeight = 0;
g.myWidth = 0;

//  -----------------------------------

g.initTime = new Date();
g.runningTime = new Date();

g.totalElapsed = 0;
g.totalFrameRate = 0;
g.countedFrames = 0;
g.countForDisplay = 0;

//  ===================================
//  -----------------------------------
function setup() {
    g.myHeight = windowHeight;
    g.myWidth = windowWidth;

    g.canvas = createCanvas(g.myWidth, g.myHeight - 50);
    frameRate(60);
    createAttractors(Attractor.arr, Particle.arr, g);
    g.deleteUnused();
    lstnrs.addListeners();
}

//  -----------------------------------
function draw() {
    background(20);

    //use it - meanwhile obj.oldTime is the previous one, after use, store it
    g.newTime = new Date();

    //time elapsed between frames
    // (1/1000 = 0.001); 0.001 * 60 = 0.06 , a constant; 1000 * 0.06 = 60
    let elapsed = (g.newTime - g.oldTime) * 0.06;
    Attractor.elapsed = elapsed;
    Particle.elapsed = elapsed;

    displayStats(g);

    calcAttractors(Attractor.arr, Particle.arr);
    // Attractor attracts particle
    g.oldTime = g.newTime;
} //end

//  =================================================================





//  ==================================

/*
IDEAS
-Attractors distance constrain

-A great improvement would be to animate using time instead of fps - done
-Collision could be added
-User interaction: very important, engages more
  -Maybe allowing to add more attractors
  -adding or changing the number of particles
  -Following mouse , altering attraction according to mouse
-Changing oppacity with proximity: closer brighter, farther dimmer, or viceversa
- Turn attractors on or off
-Single color for all particles
-display fps
-allow user to use set of complimentary colors
-option to hide or display frame rate
-some presets that I think are cool
-sound - maybe for later
-differemt colors to include
-RESET button with new settigns - more like an apply button
-Maybe also change the mass of the particles and attractors
-Random colors to all particles
-control size of particless
-Make a sound when particles come close to a certain threshold

-Maybe the attractors should be only a little bit of the color at the center and at the rest it should be black
-Attractors expand and contract on sinewave - frequency and amplitude

*/
