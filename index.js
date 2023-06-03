const canvas = document.getElementById("canvas");
const pen = canvas.getContext("2d");

const draw = () => {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  const start = {
    x: 0.25 * canvas.width,
    y: 0.5 * canvas.height,
  };

  const end = {
    x: 0.75 * canvas.width,
    y: 0.5 * canvas.height,
  };

  pen.strokeStyle = "white";
  pen.lineWidth = 1;

  pen.beginPath();
  pen.moveTo(start.x, start.y);
  pen.lineTo(end.x, end.y);
  pen.stroke();


  pen.beginPath();
  pen.lineWidth = 2;
  const centre = {
    x: 0.5 * canvas.width,
    y: 0.5 * canvas.height
  }
  pen.arc(centre.x,centre.y,20,0,2*Math.PI);

  
  pen.stroke();
  
};

draw();