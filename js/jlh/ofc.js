/*
	Order From Chaos
    A Welcome Animation with GSAP and SVG
    Jonathan Harrison
    2019
*/

// ready
$(document).ready(function() {

	// elements
    var animationContainer = $("#animationContainer");
    var svgElement = $("#orderFromChaos");
    var welcomeWhole = $("#ofcWelcomeWhole");
    var welcomeInPieces = $("#ofcWelcomeInPieces");
    var welcomePieces = $(".ofc-piece");

    // setup elements
    centerElement(svgElement);
    TweenLite.set(svgElement, { yPercent: -60 });

    /*
        Animate
    */
    // main timeline
    var tl = new TimelineMax({ delay: 0.3 });
    tl.add("assemble", 0.1);
    tl.add("stretch", 2.3);

    // show elements
    tl.to(animationContainer, 0.01, { autoAlpha: 1 }, 0);
    
    // assemble
    tl.add(assemble(welcomePieces), "assemble");

    // stretch
    tl.add(stretch(welcomePieces), "stretch");

    // replace pieces with whole text
    tl.to(welcomeWhole, 0.01, { autoAlpha: 1, immediateRender: false }, "+=0.1");
    tl.to(welcomeInPieces, 0.3, { autoAlpha: 0 });

});
// end ready

/*
    Animation Functions
*/
function assemble(elements) {
    var tl = new TimelineMax();
    var shuffledElements = sattoloShuffleCopy(elements);

    tl.staggerFrom(shuffledElements, 2, { cycle: {
        x: function() {
            // return randomInt(270, 350);
            var distance = randomInt(180, 310);
            if (randomFloat(0,1) > 0.5) {
                distance *= -1;
            }
            return distance;
        },
        y: function() {
            var base = 83;
            var distance = randomInt(50, 70);
            if (randomFloat(0,1) > 0.5) {
                distance *= -1;
            }
            return 83 - distance;
        },
        rotation: function() {
            // var angle = randomInt(720, 1440);
            var angle = randomInt(1440, 2440);
            if (randomFloat(0,1) > 0.5) {
                angle *= -1;
            }
            return angle;
        },
        scale: function() {
            // return 0.1;
            // return randomFloat(0.5, 0.6);
            return randomFloat(1.03, 1.1);
        }
    }, transformOrigin: "50% 50%" }, 0);

    return tl;
}

// after assembly, stretch the pieces out, then back together
function stretch(elements) {
    var tl = new TimelineMax();
    tl.staggerTo(elements, 0.3, { cycle: { x: stretchDestinationsX, y: stretchDestinationsY }, transformOrigin: "50% 50%", repeat: 1, yoyo: true }, 0);

    return tl;
}

/*
    Utlities
*/
// place an element at the center of its parent
function centerElement(element, xAxisOnly) {
    if (xAxisOnly) {
        TweenLite.set(element, { left:'50%', xPercent:'-50' });
    }
    else {
        TweenLite.set(element, { left:'50%',top:'50%', xPercent:'-50',yPercent:'-50'});
    }
}
// return a random float between 2 given floats
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
// return a random integer between 2 given ints
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// shuffle and return a copy of an array with derangement (Sattolo)
function sattoloShuffleCopy(array) {
    var newArray = array.slice(0);
    for (var i = newArray.length; i-- > 1; ) {
        var j = Math.floor(Math.random() * i);
        var tmp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = tmp;
    }
    return newArray;
}

/*
    Element Stretch Positions
*/
// stretch positions X
var stretchDestinationsX = [
    // w
    "-=1", "-=1.2", "-=0.8", "+=0.8", "+=0.5", "+=0.7", "+=0.9", "-=0.4", "-=1.5",
    // e
    "+=0.8", "+=1.2", "+=0.6", "-=0.6", "-=1.1", "-=0.7", "+=0.5",
    // l
    "-=0.6", "+=0.3", "-=0.7", "+=0.8",
    // c
    "+=0.6", "-=0.6", "-=1.1", "+=0.8",
    // o
    "-=1", "-=0.6", "+=0.4", "+=0.7", "+=1.2", "+=0.6", "-=0.3",
    // m
    "+=1", "+=0.7", "+=0.4", "-=0.3", "+=0.4", "-=0.1", "-=0.4", "-=1.1", "-=0.3", "-=0.7",
    // e
    "+=1", "-=0.5", "-=0.9", "-=0.5", "+=0.7", "+=1", "+=0.4"
];

// stretch positions Y
var stretchDestinationsY = [
    // w
    "+=0.5", "+=1.2", "+=0.5", "+=0.4", "+=1.1","+=0.6", "-=0.85", "-=0.8", "-=0.9",
    // e
    "-=0.4", "-=0.5", "+=0.7", "+=1", "+=0.4", "-=1", "-=1.2",
    // l
    "+=1", "+=0.5", "-=0.5", "-=1",
    // c
    "+=1", "+=0.5", "-=0.5", "-=1",
    // o
    "-=0", "+=0.5", "+=0.7", "+=0.5", "-=0.5", "-=1", "-=1",
    // m
    "+=0.8", "-=0.6", "-=0.8", "+=0.5", "+=0.3", "-=0.9", "-=1", "+=0.9", "+=0.3", "-=1",
    // e
    "+=0.7", "+=0.8", "-=1", "-=0.5", "+=0.3", "-=0.8", "-=1.1"
];
