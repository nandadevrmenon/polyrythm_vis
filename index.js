const colors = [
  "#eeefe5",
  "#dde7db",
  "#c6ddcc",
  "#a4cdb7",
  "#8fc3aa",
  "#71b697",
  "#6eb696",
  "#49a582",
  "#3ea17d",
  "#1e9970",
  "#269d75",
  "#279f76",
  "#30a47b",
  "#3bac84",
  "#3cac84",
  "#42b189",
  "#4cba92",
  "#51be97",
  "#58c49d",
  "#8cd2b7"
].map((color)=>{
  const audio = new Audio();
})



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

  let start = {
    x: 0.25 * canvas.width,
    y: 0.5 * canvas.height,
  };

  let end = {
    x: 0.75 * canvas.width,
    y: 0.5 * canvas.height,
  };

  if(canvas.width*0.5>canvas.height){
    start ={
      x:canvas.width*0.5-(canvas.height/2),
      y: 0.5 * canvas.height,
    }
    end ={
      x:canvas.width*0.5+(canvas.height/2),
      y: 0.5 * canvas.height,
    }
    console.log(start,end);
  }


  
  let length = end.x- start.x;

  const smallestRadius = (length *  0.05)+3;  // staggers all radii so that final circumference aligns with the end of the line.
  const centre = {  //centre of all circles
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height
  }

  //draw main line
  pen.beginPath();
  pen.moveTo(start.x, start.y);
  pen.lineTo(end.x, end.y);
  pen.stroke();


  totalSpace = length/2;

  colors.forEach((color,index)=>{
    //draw circle
    const radius = smallestRadius+((totalSpace/colors.length-1)*index);
    pen.strokeStyle=color;
    pen.beginPath();
    pen.lineWidth = 1;
    pen.arc(centre.x, centre.y, radius, 0,2 * Math.PI);
    pen.stroke();
    
    // draw stationary dots on both sides of circle
    pen.fillStyle="#cfffc8";
    pen.globalAlpha=0.40;
    pen.beginPath();
    pen.lineWidth = 1;
    let dotX = centre.x + radius;
    let dotY =  centre.y;
    pen.arc(dotX,dotY, length * 0.006, 0,2 * Math.PI);
    pen.fill();

    pen.beginPath();
    pen.lineWidth = 1;
    dotX = centre.x - radius;
    dotY =  centre.y;
    pen.arc(dotX,dotY, length * 0.006, 0,2 * Math.PI);
    pen.fill();
    
    pen.globalAlpha=1;
    //draw moving dot
    const angularVelocity = Math.PI/4;
    const angularDistance=(elapsedTime* (angularVelocity+(Math.PI/8)*(index+1)/colors.length))%(Math.PI*2); //explain this 

    pen.fillStyle="d7ecd9ff";
    pen.beginPath();
    pen.lineWidth = 1;
    dotX = radius * Math.cos(angularDistance) +centre.x;
    dotY = radius * Math.sin(angularDistance) +centre.y;
    pen.arc(dotX,dotY, length * 0.006, 0,2 * Math.PI);
    pen.fill();
  });


requestAnimationFrame(draw);
};

draw();


