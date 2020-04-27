import "./styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.rect(160, 10, 100, 40);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
})