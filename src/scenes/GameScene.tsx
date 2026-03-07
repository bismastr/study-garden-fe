import BunnySprite from "../components/BunnySprite";
import GrassMap from "../components/GrassMap";

const GameScene = () => {
    return (
        <pixiContainer>
            <GrassMap />
            <BunnySprite />
        </pixiContainer>
    );
};

export default GameScene;
