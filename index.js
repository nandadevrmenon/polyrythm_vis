const startTime = new Date().getTime();   //initial Time on page load 
let soundEnabled = false;
const circles = [];
for(let index = 0 ; index <20 ; index++){
  const audio = new Audio("audio/"+index+".mp3");
  audio.volume = 0.1;
  
  const initialVel = Math.PI/4;
  const angularVelocity = (initialVel+(Math.PI/8)*(index+1)/20);

  let lastImpactTime = startTime;
  let nextImpactTime = calculateNextImpactTime(startTime,angularVelocity);

  circles[index] = {
    audio,
    angularVelocity,
    lastImpactTime,
    nextImpactTime,
  }
}   //returns a list of circles with all their info


const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");


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

  circles.forEach((circle,index)=>{
    //draw circle
    pen.globalAlpha = calculateDynamicOpacity(currentTime, circle.lastImpactTime, 0.15, 0.65, 1000);
    const radius = smallestRadius+((totalSpace/circles.length-1)*index);
    pen.strokeStyle="#c5bbbc";
    pen.beginPath();
    pen.lineWidth = 1;
    pen.arc(centre.x, centre.y, radius, 0,2 * Math.PI);
    pen.stroke();
    
    // draw stationary dots on both sides of circle
    pen.fillStyle="#f6eff0";
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
    const angularDistance=(elapsedTime* (circle.angularVelocity))%(Math.PI*2); //explain this 

    pen.fillStyle="c5bbbc";
    pen.beginPath();
    pen.lineWidth = 1;
    dotX = radius * Math.cos(angularDistance) +centre.x;
    dotY = radius * Math.sin(angularDistance) +centre.y;
    pen.arc(dotX,dotY, length * 0.006, 0,2 * Math.PI);
    pen.fill();

    if(currentTime > circle.nextImpactTime) {
      circle.lastImpactTime =circle.nextImpactTime;
      circle.nextImpactTime = calculateNextImpactTime(circle.nextImpactTime,circle.angularVelocity);
      if(soundEnabled)  circle.audio.play();
    }

  });


requestAnimationFrame(draw);
};

draw();

const enableSoundButton = document.getElementById("enableSoundPrompt");
const disableSoundButton = document.getElementById("disableSoundPrompt");

enableSoundButton.onclick = ()=>{ 
  soundEnabled=true;
  enableSoundButton.classList.add("hide");
  disableSoundButton.classList.remove("hide");
}

disableSoundButton.onclick = ()=>{ 
  soundEnabled=false;
  enableSoundButton.classList.remove("hide");
  disableSoundButton.classList.add("hide");
}

document.onvisibilitychange= ()=>{ 
  soundEnabled = false;
  enableSoundButton.classList.remove("hide");
  disableSoundButton.classList.add("hide");
};


function calculateNextImpactTime(currentImpactTime,angularVelocity){
  return currentImpactTime+((Math.PI)/angularVelocity)*1000;//next impact = firstImpact + (distance/speed)
}

function calculateDynamicOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, duration){
  const timeSinceImpact = currentTime - lastImpactTime,
        percentage = Math.min(timeSinceImpact / duration, 1),//gets timeSince impact as a fraction with duration or 1 whichever is less
        opacityDelta = maxOpacity - baseOpacity;
  return maxOpacity - (opacityDelta * percentage);
}
