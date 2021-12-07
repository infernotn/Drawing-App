const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

var rect = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - rect.top;
canvas.width = window.innerWidth;
//auto resize the canvas when resize the browser
window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});
var thickness = "5";
var color = "black";
ctx.lineWidth = thickness;
ctx.fillStyle = color;

var pMode = "BRUSH";
var painting = false;

canvas.addEventListener("click", (event) => {
  if (pMode == "LINES") {
    if (!painting) {
      startDraw(event);
    } else {
      draw(event);
    }
  } else {
    var x = event.clientX - rect.left; //x position within the element.
    var y = event.clientY - rect.top;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, 2 * Math.PI);

    ctx.fillStyle = color;
    ctx.stroke();
    ctx.fill();
  }
});

canvas.addEventListener("dblclick", () => {
  if (pMode === "LINES") {
    if (painting) {
      painting = false;
      //  closeP();
    }
  }
});

//// draw with mouse ///when clickdown and move

document.addEventListener("mousedown", (event) => {
  if (pMode == "BRUSH") {
    startDraw(event);
  }
});

document.addEventListener("mousemove", (event) => {
  if (pMode == "BRUSH") {
    if (!painting) {
      return;
    } else {
      draw(event);
    }
  }
});

document.addEventListener("mouseup", () => {
  if (pMode == "BRUSH") {
    painting = false;
  }
});

function startDraw(e) {
  var x = e.clientX; //x position within the element.
  var y = e.clientY;
  ctx.beginPath();
  ctx.moveTo(x, y);
  painting = true;
  console.log("start draw");
  console.log(painting);
}
function draw(e) {
  var x = e.clientX; //x position within the element.
  var y = e.clientY;
  ctx.lineTo(x, y);

  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.lineJoin = "round";
  ctx.stroke();
  console.log("draw");
  console.log(x);
  console.log(y);
}

function closeP() {
  ctx.lineWidth = thickness;
  ctx.strokeStyle = color;
  ctx.lineCap = "round";
  ctx.closePath();
  ctx.stroke();
  painting = false;
  console.log("close path");
}
function changeThickness() {
  console.log("changed");
  thickness = document.querySelector("#Thickness").value;
  console.log(thickness);
  ctx.lineWidth = thickness;
}
function changeColor() {
  color = document.querySelector("#Color").value;
  ctx.strokeStyle = color;
}
function changeMode() {
  if (pMode === "BRUSH") {
    pMode = "LINES";
    console.log(pMode);
  } else {
    closeP(thickness, color);
    pMode = "BRUSH";
    console.log(pMode);
  }
}
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
