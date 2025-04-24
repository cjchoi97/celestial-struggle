import "./styles/index.scss";
import Game from "./game";
import Controls from "./controls";

export let game = null;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  game = new Game(canvas, ctx);
  window.game = game;
});
