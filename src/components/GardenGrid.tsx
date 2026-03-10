import { useApplication } from "@pixi/react";
import { useRoomStore } from "../store/useRoomStore";
import FlowerSprite from "./FlowerSprite";

const GRID_COLS = 4;
const TILE_SIZE = 16;
const COL_TILES = [11, 13, 16, 18];
const ROW_TILES = [7, 9];
const IMG_CENTER_X = 240; // 480 / 2
const IMG_CENTER_Y = 136; // 272 / 2
const MAP_SCALE = 4; // match GrassMap scale
const FOCUS_DURATION = 1500;

function getSlotPosition(slot: number): { x: number; y: number } {
  const col = slot % GRID_COLS;
  const row = Math.floor(slot / GRID_COLS);
  return {
    x: (COL_TILES[col] * TILE_SIZE - IMG_CENTER_X) * MAP_SCALE,
    y: (ROW_TILES[row] * TILE_SIZE - IMG_CENTER_Y) * MAP_SCALE,
  };
}

function getGrowthStage(timerRunning: boolean, remaining: number): number {
  if (!timerRunning) return 0;
  const progress = 1 - remaining / FOCUS_DURATION;
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

const GardenGrid = () => {
  const { app } = useApplication();
  const users = useRoomStore((s) => s.users);
  const timer = useRoomStore((s) => s.timer);

  const growthStage = getGrowthStage(timer.timerRunning, timer.remaining);

  return (
    <pixiContainer x={app.screen.width / 2} y={app.screen.height / 2}>
      {users
        .filter((u) => u.slot >= 0 && u.slot < 8)
        .map((user) => {
          const pos = getSlotPosition(user.slot);
          return (
            <FlowerSprite
              key={user.id}
              x={pos.x}
              y={pos.y}
              username={user.username}
              growthStage={growthStage}
            />
          );
        })}
    </pixiContainer>
  );
};

export default GardenGrid;
