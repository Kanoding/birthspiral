var myTurtle, step;
var started = false;
var colorScalePhase = 'g_up';
var r = 255;
var g = 0;
var b = 0;
var actualRGB = [255, 0, 0];
var birthColorInterval = 1;

function setup() {
  var myCanvas = createCanvas(800,400);
  myCanvas.parent("p5Canvas");
  background(0);
  
  frameRate(60);

  myTurtle = new makeTurtle(width/2, height/2);
}

function draw() {
  //userInput can be used for varying Turtle's parameters
  var userInput = document.getElementById("userInput").value;

  if(started){
    myTurtle.forward(step);
    myTurtle.left(userInput);
    step = step + 5;
    birthColorInterval = Math.round(userInput / 100000)
    actualRGB = colorScale(birthColorInterval);
    myTurtle.setColor(color(actualRGB[0], actualRGB[1], actualRGB[2]));
    //myTurtle.setColor(color(Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1),Math.floor((Math.random() * 255) + 1)));
    //if (myTurtle.y > height || myTurtle.x > width) resetCanvas();
  }
}

function start() {
   started = true;
   resetCanvas();
}

function resetCanvas() {
    background(0);
    myTurtle.setColor(color(255,200,200));
    myTurtle.setWeight(5);
    myTurtle.penUp();
    myTurtle.goto(width/2, height/2);
    myTurtle.penDown();
    step = 10;
    var colorScalePhase = 'g_up';
    var r = 255;
    var g = 0;
    var b = 0;
}

//=======================================================
// TURTLE GRAPHICS IMPLEMENTATION
// Roger Dannenberg, 2016
//
// makeTurtle(x, y) -- make a turtle at x, y, facing right, pen down
// left(d) -- turn left by d degrees
// right(d) -- turn right by d degrees
// forward(p) -- move forward by p pixels
// back(p) -- move back by p pixels
// penDown() -- pen down
// penUp() -- pen up
// goto(x, y) -- go straight to this location
// setColor(color) -- set the drawing color
// setWeight(w) -- set line width to w
// face(d) -- turn to this absolute direction in degrees
// angleTo(x, y) -- what is the angle from my heading to location x, y?
// turnToward(x, y, d) -- turn by d degrees toward location x, y
// distanceTo(x, y) -- how far is it to location x, y?

function turtleLeft(d) {
    this.angle -= d;
}


function turtleRight(d) {
    this.angle += d;
}


function turtleForward(p) {
    var rad = radians(this.angle);
    var newx = this.x + cos(rad) * p;
    var newy = this.y + sin(rad) * p;
    this.goto(newx, newy);
}


function turtleBack(p) {
    this.forward(-p);
}


function turtlePenDown() {
    this.penIsDown = true;
}


function turtlePenUp() {
    this.penIsDown = false;
}


function turtleGoTo(x, y) {
    if (this.penIsDown) {
      stroke(this.color);
      strokeWeight(this.weight);
      line(this.x, this.y, x, y);
    }
    this.x = x;
    this.y = y;
}


function turtleDistTo(x, y) {
    return sqrt(sq(this.x - x) + sq(this.y - y));
}


function turtleAngleTo(x, y) {
    var absAngle = degrees(atan2(y - this.y, x - this.x));
    var angle = ((absAngle - this.angle) + 360) % 360.0;
    return angle;
}


function turtleTurnToward(x, y, d) {
    var angle = this.angleTo(x, y);
    if (angle < 180) {
        this.angle += d;
    } else {
        this.angle -= d;
    }
}


function turtleSetColor(c) {
    this.color = c;
}


function turtleSetWeight(w) {
    this.weight = w;
}


function turtleFace(angle) {
    this.angle = angle;
}


function makeTurtle(tx, ty) {
    var turtle = {x: tx, y: ty,
                  angle: 0.0,
                  penIsDown: true,
                  color: color(128),
                  weight: 1,
                  left: turtleLeft, right: turtleRight,
                  forward: turtleForward, back: turtleBack,
                  penDown: turtlePenDown, penUp: turtlePenUp,
                  goto: turtleGoTo, angleto: turtleAngleTo,
                  turnToward: turtleTurnToward,
                  distanceTo: turtleDistTo, angleTo: turtleAngleTo,
                  setColor: turtleSetColor, setWeight: turtleSetWeight,
                  face: turtleFace};
    return turtle;
}



function colorScale(interval)
{
    if (colorScalePhase == 'g_up')
    {
        if (g + interval <= 255)
        {
            g += interval;
        }
        else
        {
            colorScalePhase = 'r_down';
        }
    }
    else if (colorScalePhase == 'r_down')
    {
        if (r - interval >= 0)
        {
            r -= interval;
        }
        else
        {
            colorScalePhase = 'b_up';
        }
    }
    else if (colorScalePhase == 'b_up')
    {
        if (b + interval <= 255)
        {
            b += interval;
        }
        else
        {
            colorScalePhase = 'g_down';
        }
    }
    else if (colorScalePhase == 'g_down')
    {
        if (g - interval >= 0)
        {
            g -= interval;
        }
        else
        {
            colorScalePhase = 'r_up';
        }
    }
    else if (colorScalePhase == 'r_up')
        if (r + interval <= 255)
        {
            r += interval;
        }
        else
        {
            colorScalePhase = 'b_down';
        }
    else if (colorScalePhase == 'b_down')
    {
        if (b - interval >= 0)
        {
            b -= interval;
        }
        else
        {
            colorScalePhase = 'g_up';
        }
    }
    return [r, g, b]
}
