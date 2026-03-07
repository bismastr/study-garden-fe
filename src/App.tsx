import { Application, extend } from "@pixi/react";
import { Container, Sprite, Text } from "pixi.js";
import GameScene from "./scenes/GameScene";
import GameUI from "./components/GameUI";
import { RoomProvider } from "./components/RoomProvider";
import MainMenu from "./components/MainMenu";
import { useRoomStore } from "./store/useRoomStore";

extend({ Container, Sprite, Text });

export default function App() {
  const phase = useRoomStore((s) => s.phase);
  const roomNumber = useRoomStore((s) => s.roomNumber);

  if (phase === "menu") return <MainMenu />;

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
