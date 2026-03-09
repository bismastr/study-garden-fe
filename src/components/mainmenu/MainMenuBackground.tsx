import { useApplication, useTick } from "@pixi/react";
import { Assets, Texture, TilingSprite } from "pixi.js";
import { useEffect, useRef, useState } from "react";

const IMAGE_W = 576;
const IMAGE_H = 324;

const MainMenuBackground = () => {
    const { app } = useApplication();
    const [texture, setTexture] = useState(Texture.EMPTY);
    const [cloud, setCloud] = useState(Texture.EMPTY);
    const [gradient, setGradient] = useState(Texture.EMPTY);
    const [bigCloud, setBigCloud] = useState(Texture.EMPTY);
    const cloudRef = useRef<TilingSprite>(null);
    const bigCloudRef = useRef<TilingSprite>(null);

    useTick((ticker) => {
        if (cloudRef.current) {
            cloudRef.current.tilePosition.x -= 0.3 * ticker.deltaTime;   // faster
        }
        if (bigCloudRef.current) {
            bigCloudRef.current.tilePosition.x -= 0.1 * ticker.deltaTime;
        }
    });

    useEffect(() => {
        Assets.load("/assets/mainmenu/1.png").then((t: Texture) => {
            t.source.scaleMode = "nearest"; // pixel-perfect, no blur
            setTexture(t);
        });

        Assets.load("/assets/mainmenu/3.png").then((t: Texture) => {
            t.source.scaleMode = "nearest"; // pixel-perfect, no blur
            setCloud(t);
        });

        Assets.load("/assets/mainmenu/2.png").then((t: Texture) => {
            t.source.scaleMode = "nearest"; // pixel-perfect, no blur
            setGradient(t);
        });

        Assets.load("/assets/mainmenu/4.png").then((t: Texture) => {
            t.source.scaleMode = "nearest"; // pixel-perfect, no blur
            setBigCloud(t);
        });




    }, []);

    const scaleX = app.screen.width / IMAGE_W;
    const scaleY = app.screen.height / IMAGE_H;

    return (
        <pixiContainer>
            <pixiSprite
                texture={texture}
                anchor={0.5}
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                scale={{ x: scaleX, y: scaleY }}
            />
            <pixiSprite
                texture={gradient}
                anchor={0.5}
                x={app.screen.width / 2}
                y={app.screen.height / 2}
                scale={1.5}
            />
            <pixiTilingSprite
                texture={bigCloud}
                x={0}
                y={0}
                width={app.screen.width}
                height={app.screen.height}
                tileScale={{ x: 1, y: 1 }}
                ref={bigCloudRef}
            />
            <pixiTilingSprite
                texture={cloud}
                x={0}
                y={0}
                width={app.screen.width}
                height={app.screen.height}
                tileScale={{ x: 1, y: 1 }}
                ref={cloudRef}
            />

        </pixiContainer>
    );
};

export default MainMenuBackground;