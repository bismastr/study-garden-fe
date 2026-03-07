import { Assets, Texture } from "pixi.js";
import { useEffect, useState } from "react";

const FLOWER_PATHS = [
  "/assets/flower/flower_01.png",
  "/assets/flower/flower_02.png",
  "/assets/flower/flower_03.png",
  "/assets/flower/flower_04.png",
];

const FLOWER_SCALE = 4;

interface FlowerSpriteProps {
  x: number;
  y: number;
  username: string;
  growthStage: number;
}

const FlowerSprite = ({ x, y, username, growthStage }: FlowerSpriteProps) => {
  const [textures, setTextures] = useState<Texture[]>([]);

  useEffect(() => {
    Promise.all(FLOWER_PATHS.map((p) => Assets.load(p))).then(setTextures);
  }, []);

  const texture = textures[growthStage] ?? Texture.EMPTY;

  return (
    <pixiContainer x={x} y={y}>
      <pixiSprite texture={texture} anchor={0.5} scale={FLOWER_SCALE} y={0} />
      <pixiText
        text={username}
        anchor={{ x: 0.5, y: 0 }}
        y={40}
        style={{
          fontSize: 14,
          fill: 0xffffff,
          fontFamily: "Arial",
          fontWeight: "bold",
          dropShadow: {
            alpha: 0.8,
            color: 0x000000,
            distance: 1,
            blur: 2,
          },
        }}
      />
    </pixiContainer>
  );
};

export default FlowerSprite;
