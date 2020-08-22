const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector(".js-range");
const mode = document.querySelector(".js-mode");
const save = document.querySelector(".js-save");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 3;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath(); // line의 시작점을 만듦 (그릴 준비)
    ctx.moveTo(x, y); // beginPath()에서 만든 시작점을 x, y로 옮김 (붓 옮김)
  } else {
    // 아래 두 메소드는 마우스를 움직이는 내내 발생하고 있음
    ctx.lineTo(x, y); // 현재 좌표에서 x, y까지 선 연결 (선을 긋는다)
    ctx.stroke(); // 그은 선을 보여준다
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  if (filling) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
    ctx.fillRect();
  }
}

function handleCanvasClick(event) {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleContextMenu(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("");
  const link = document.createElement("a");
  link.href = image;
  link.download = "SuperNicePAINTING👏";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

if (colors) {
  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range) {
  // input event: input, select, textarea의 value 속성이 바뀔 때마다 발생
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
