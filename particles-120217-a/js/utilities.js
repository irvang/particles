//  -----------------------------------
function calcAttractors(attArray, partArray) {
    for (let i = 0; i < Attractor.nbAtrctr; ++i) {
        attArray[i].update();
        attArray[i].edges();
        attArray[i].displayIt();

        calcParticles(i, attArray, partArray);
    }
}

//  -----------------------------------
function calcParticles(i, attArray, partArray) {
    for (let j = 0; j < Particle.nbPtcls; ++j) {

        //  calculate attractions is a function of attractor class
        // calculate attraction between particles and attractor
        // let force = attArray[i].calculateAttraction(partArray[i][j]);

        attArray[i].calculateAttraction(partArray[i][j]);

        //  apply force (attraction) to each particle
        partArray[i][j].applyForce();

        //  update and display
        partArray[i][j].update();
        partArray[i][j].display();
    }
}

//  -----------------------------------
function createAttractors(attArray, partArray, g) {
    for (let i = 0; i < Attractor.nbAtrctr; ++i) {
        //  create the arrays

        partArray.push([]);// Particle.arr = [ [],[],[], ... ]

        let color = getARandomColor();

        // Attractor (x, y, mass, gravity, color) 10 + random(10)
        attArray[i] = new Attractor(random(g.myWidth), random(g.myHeight), g.attMass + random(g.randMass), g.attGravity, 'rgba(75,75,75, 0.4)');

        createParticles(i, color, partArray, g);
    }
}

//  -----------------------------------
function createParticles(i, color, partArray, g) {
    for (let j = 0; j < Particle.nbPtcls; ++j) {
        partArray[i][j] = new Particle(random(g.myWidth), random(g.myHeight), color);
    }
}

//  -----------------------------------
function displayStats(g) {
    g.countForDisplay %= 10; g.countForDisplay++;
    if (g.countForDisplay >= 10) {
        g.word = round(frameRate());
        // word2 = totalElapsed;
    }
    text("fps: " + g.word, 10, 30);

    ////    averaging fps for 10 sec
    // if (totalElapsed < 10000) {
    //     totalElapsed = newTime - initTime;
    //     var currentFrameRate = frameRate();
    // totalFrameRate += frameRate();
    // countedFrames++;
    // }

    // var displayTotal = ((countedFrames / (totalElapsed * 0.001)).toFixed(2));
    // text('ms: ' + totalElapsed + '. \nAverage FPS: ' + displayTotal, 10, 60);
}