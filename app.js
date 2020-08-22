const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".js-color");
const range = document.querySelector(".js-range");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

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
}

function handleRangeChange(event) {
  console.log(event);
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
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
