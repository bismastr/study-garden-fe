import { useApplication, useTick } from "@pixi/react";
import { Assets, Sprite, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

const BunnySprite = () => {
    const { app } = useApplication();
    const spriteRef = useRef<Sprite>(null);
    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (texture === Texture.EMPTY) {
            Assets.load("/assets/bunny.png").then((result) => {
                setTexture(result);
            });
        }
    }, [texture]);

    useTick((ticker) => {
        if (!spriteRef.current) return;
        spriteRef.current.rotation += 0.1 * ticker.deltaTime;
        spriteRef.current.x = app.screen.width / 2 + Math.cos(ticker.lastTime / 1000) * 100;
        spriteRef.current.y = app.screen.height / 2 + Math.sin(ticker.lastTime / 1000) * 100;
    });

    return (
        <pixiSprite
            ref={spriteRef}
            texture={texture}
            anchor={0.5}
            x={app.screen.width / 2}
            y={app.screen.height / 2}
        />
    );
};

export default BunnySprite;
