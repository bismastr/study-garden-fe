import { Application, extend } from "@pixi/react";
import { Container, Sprite } from "pixi.js";
import GameScene from "./scenes/GameScene";

extend({ Container, Sprite });

export default function App() {
  return (
    <Application background={"#1099bb"} resizeTo={window}>
      <GameScene />
    </Application>
  );
}
