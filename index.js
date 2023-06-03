const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");

const startTime = new Date().getTime();

const draw = () => {
  //get time when rendering canvas
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime-startTime)/1000;

  //initialise pen and canvas
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  pen.strokeStyle = "white";
  pen.lineWidth = 1;

  const start = {
    x: 0.25 * canvas.width,
    y: 0.5 * canvas.height,
  };

  const end = {
    x: 0.75 * canvas.width,
    y: 0.5 * canvas.height,
  };

  const length = end.x- start.x;
  const radius = length *  0.05;
  const centre = {  //centre of all circles
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height
  }

  //draw main line
  pen.beginPath();
  pen.moveTo(start.x, start.y);
  pen.lineTo(end.x, end.y);
  pen.stroke();

//draw circle
  pen.beginPath();
  pen.lineWidth = 1;
  pen.arc(centre.x, centre.y, radius, 0,2 * Math.PI);
  pen.stroke();
  
  const angularVelocity = Math.PI/2;
  const angularDistance=(elapsedTime* angularVelocity)%(Math.PI*2);
  //draw dot
  pen.fillStyle="white";
  pen.beginPath();
  pen.lineWidth = 1;
  const dotX = radius * Math.cos(angularDistance) +centre.x;
  const dotY = radius * Math.sin(angularDistance) +centre.y;
  pen.arc(dotX,dotY, length * 0.006, 0,2 * Math.PI);
  pen.fill();

requestAnimationFrame(draw);
};

draw();


