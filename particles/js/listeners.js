"use strict";
let lstnrs = {};// an object for the listeners' values
lstnrs.toggle1 = false;

//used together, but listener changes one at a timeß
lstnrs.pLimitLo = 7;
lstnrs.pLimitHi = 10;

//-------------------------------------
//====LISTENERS
lstnrs.addListeners = function () { // invoked from setup

	//buttons
	let showAtrctr = document.querySelector('#toggleAtt');
	showAtrctr.addEventListener('click', toggleButton(lstnrs));

	let changeColorsB = document.querySelector('#recolor');
	changeColorsB.addEventListener('click', changeColors);
	//inputs
	let aMassLstnr = document.querySelector('#aMass');
	aMassLstnr.addEventListener('input', updateAtrctrM);

	let pMassLstnr = document.querySelector('#pMass');
	pMassLstnr.addEventListener('input', particleMass);

	let pLimitLo = document.querySelector('#pLimitLo');
	pLimitLo.addEventListener('input', changeLo(lstnrs));

	let pLimitHi = document.querySelector('#pLimitHi');
	pLimitHi.addEventListener('input', changeHi(lstnrs));


	let myWindow = window.addEventListener('resize', adjustSize);
}

//  ===================================
//====LISTENER's FUNCTIONSÍ

function changeLo(lstnrs) {//(lstnrs obj)
	return function (evt) {
		lstnrs.pLimitLo = parseFloat(evt.target.value);
		setPLimit(lstnrs);
	}
}

//-------------------------------------
function changeHi(lstnrs) {//(lstnrs obj)
	return function (evt) {
		lstnrs.pLimitHi = parseFloat(evt.target.value);
		setPLimit(lstnrs);
	}
}

//-------------------------------------
function setPLimit(lstnrs) {//sets particle limit / (lstnrs obj)
	for (let i = 0; i < Attractor.nbAtrctr; ++i) {
		for (let j = 0; j < Particle.nbPtcls; ++j) {
			Particle.arr[i][j].limit = random(lstnrs.pLimitLo, lstnrs.pLimitHi);
		}
	}
}

//-------------------------------------
function changeColors() {
	for (let i = 0; i < Attractor.nbAtrctr; ++i) {
		let newColor = getARandomColor();
		// Attractor.arr[i].color = newColor;
		for (let j = 0; j < Particle.nbPtcls; ++j) {
			Particle.arr[i][j].color = newColor;
		}
	}
}

//-------------------------------------
function toggleButton(_lstnrs) { // type: lstnrs
	return function () {
		_lstnrs.toggle1 = !_lstnrs.toggle1;
	}
}

//-------------------------------------
function updateAtrctrM(evt) {
	Attractor.arr.forEach(function (element) {
		element.mass = element.initialMass * evt.target.value;//implicit conversion probably by '*'
	});
}

//-------------------------------------
function particleMass(evt) {
	Particle.scalM = parseFloat(evt.target.value);
}

//-------------------------------------
function adjustSize() {

	g.myWidth = event.target.innerWidth;
	g.myHeight = event.target.innerHeight;
	// canvas.width = myWidth;
	// canvas.height = myHeight;
	resizeCanvas(g.myWidth, g.myHeight - 50);
	// console.log(myWidth + " " + myHeight);
}

//-------------------------------------
function testIt() {
	console.log('test works');
}

// -----------------------------------------------------------------
// =================================================================
/*

Att-Mass changes the behavior by scaling the mass of the attractors.

Part-mass only changes the visual effect. It has no effect on the behavior of the program.

*/