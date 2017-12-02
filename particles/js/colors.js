//  =================================================================
//  Color selection
//See here if full array wanted: https://gist.github.com/bobspace/2712980
"use strict";
////  rgba:
let red = 'rgba(255, 0, 0, 0.8)',
    blue = 'rgba(0, 0, 255, 0.8)',
    cyan = 'rgba(0, 255, 255, 0.8)',
    green = 'rgba(0, 128, 0, 0.8)',
    yellow = 'rgba(255, 255, 0, 0.8)',
    lime = 'rgba(0, 255, 0, 0.8)',
    fuchsia = 'rgba(255, 0, 255, 0.8)',
    orange = 'rgba(255, 165, 0, 0.8)',
    chartreuse = 'rgba(127, 255, 0, 0.8)',
    deeppink = 'rgba(255, 20, 147, 0.8)',
    dodgerblue = 'rgba(30, 144, 255, 0.8)',
    white = 'rgba(255, 255, 255, 0.8)',
    greenyellow = 'rgba(173, 255, 47, 0.8)';

//use this array for alpha
// let myColors2 = [red, blue, cyan, yellow, lime, fuchsia, orange, chartreuse, deeppink, white, greenyellow];

// without alpha
var myColors2 = ['red', 'fuchsia', 'lime', 'yellow', 'blue', 'aqua', 'chartreuse', 'white', 'deeppink', 'greenyellow' ]; 
let storeColors = myColors2.slice();// slice creates copy




function getARandomColor() {

    /*  a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1 */
    var colorIndex = Math.round((myColors2.length - 1) * Math.random());
    var c = myColors2[colorIndex];

    if (colorIndex > -1) { // avoid repeating a color
        myColors2.splice(colorIndex, 1);

        //  if array is at end
        if (myColors2.length === 0)
            myColors2 = storeColors.slice();// make a copy
    }

    // var c = colors[5];// specific color
    // var c = white;

    // return the random color
    return c;
}