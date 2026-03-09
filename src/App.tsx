import { Application, extend } from "@pixi/react";
import { Container, Sprite, Text, TilingSprite } from "pixi.js";
import { RoomProvider } from "./components/RoomProvider";
import MainMenuBackground from "./components/mainmenu/MainMenuBackground";
import { useRoomStore } from "./store/useRoomStore";
import MainMenu from "./pages/MainMenu";
import GameScene from "./scenes/GameScene";
import GameUI from "./components/GameUI";

extend({ Container, Sprite, Text, TilingSprite });

export default function App() {
  const phase = useRoomStore((s) => s.phase);
  const roomNumber = useRoomStore((s) => s.roomNumber);

  if (phase === "menu")
    return (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Application
          background={"#1099bb"}
          resizeTo={window}
          resolution={window.devicePixelRatio}
        >
          <MainMenuBackground />
        </Application>
        <MainMenu />
      </div>
    );

  return (
    <RoomProvider roomNumber={roomNumber}>
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Application background={"#1099bb"} resizeTo={window}>
          <GameScene />
        </Application>
        <GameUI />
      </div>
    </RoomProvider>
  );
}
