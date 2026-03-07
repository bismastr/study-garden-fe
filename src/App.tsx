import { Application, extend } from "@pixi/react";
import { Container, Sprite } from "pixi.js";
import GameScene from "./scenes/GameScene";
import GameUI from "./components/GameUI";

extend({ Container, Sprite });

export default function App() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Application background={"#1099bb"} resizeTo={window}>
        <GameScene />
      </Application>
      <GameUI />
    </div>
  );
}
