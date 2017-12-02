//declare a namespace for global variables
let g = {}; 

//-------------------------------------
g.deleteUnused = function () {
	// properties to be deleted after they are used in setup
	delete this.attMass;
	delete this.randMass;
	delete this.attGravity;
}

