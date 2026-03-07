import { useApplication } from "@pixi/react";
import { Assets, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { Sprite } from "pixi.js";

const GrassMap = () => {
  const { app } = useApplication();
  const spriteRef = useRef<Sprite>(null);
  const [texture, setTexture] = useState(Texture.EMPTY);

  useEffect(() => {
    if (texture === Texture.EMPTY) {
      Assets.load("/assets/grass_day_map.png").then((result) => {
        setTexture(result);
      });
    }
  }, [texture]);

  return (
    <pixiSprite
      ref={spriteRef}
      texture={texture}
      anchor={0.5}
      scale={2}
      x={app.screen.width / 2}
      y={app.screen.height / 2}
    />
  );
};

export default GrassMap;
