import { useApplication, useTick } from "@pixi/react";
import { AnimatedSprite, Assets, Spritesheet, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

const LEAF_COUNT = 14;
const LEAF_SCALE_MIN = 1.5;
const LEAF_SCALE_MAX = 3.5;

interface LeafData {
    x: number;
    y: number;
    vx: number;  // horizontal drift (breeze)
    vy: number;  // vertical drift
    rot: number;
    rotSpeed: number;
    scale: number;
    sinOffset: number; // phase offset for vertical oscillation
}

function randomLeaf(screenW: number, screenH: number, randomX = true): LeafData {
    return {
        x: randomX ? Math.random() * screenW : -20,
        y: Math.random() * screenH,
        vx: 0.3 + Math.random() * 0.5,
        vy: 0,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        scale: LEAF_SCALE_MIN + Math.random() * (LEAF_SCALE_MAX - LEAF_SCALE_MIN),
        sinOffset: Math.random() * Math.PI * 2,
    };
}

const LeafSprite = () => {
    const { app } = useApplication();
    const [textures, setTextures] = useState<Texture[]>([]);
    const spritesRef = useRef<(AnimatedSprite | null)[]>(Array(LEAF_COUNT).fill(null));
    const leavesRef = useRef<LeafData[]>([]);
    const tickRef = useRef(0);

    useEffect(() => {
        Assets.load("/assets/leaf/leaf_metadata.json").then((sheet: Spritesheet) => {
            setTextures(sheet.animations.leaf);
        });
    }, []);

    useEffect(() => {
        if (textures.length === 0) return;
        const { width, height } = app.screen;
        leavesRef.current = Array.from({ length: LEAF_COUNT }, () =>
            randomLeaf(width, height)
        );
        spritesRef.current.forEach((s) => s?.play());
    }, [textures, app.screen]);

    useTick((ticker) => {
        tickRef.current += ticker.deltaTime;
        const { width, height } = app.screen;
        leavesRef.current.forEach((leaf, i) => {
            const sprite = spritesRef.current[i];
            if (!sprite) return;

            leaf.x += leaf.vx * ticker.deltaTime;
            leaf.y += Math.sin(tickRef.current * 0.03 + leaf.sinOffset) * 0.4;
            leaf.rot += leaf.rotSpeed * ticker.deltaTime;

            // wrap around when off the right edge
            if (leaf.x > width + 20) {
                Object.assign(leaf, randomLeaf(width, height, false));
            }

            sprite.x = leaf.x;
            sprite.y = leaf.y;
            sprite.rotation = leaf.rot;
        });
    });

    if (textures.length === 0) return null;

    return (
        <pixiContainer>
            {Array.from({ length: LEAF_COUNT }, (_, i) => (
                <pixiAnimatedSprite
                    key={i}
                    ref={(el) => { spritesRef.current[i] = el; }}
                    textures={textures}
                    anchor={0.5}
                    x={leavesRef.current[i]?.x ?? 0}
                    y={leavesRef.current[i]?.y ?? 0}
                    scale={leavesRef.current[i]?.scale ?? 2}
                    animationSpeed={0.1}
                />
            ))}
        </pixiContainer>
    );
};

export default LeafSprite;
