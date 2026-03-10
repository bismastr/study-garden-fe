import LeafSprite from "@/components/garden/LeafSprite";
import GrassMap from "../components/garden/GrassMap";
import GardenGrid from "../components/GardenGrid";

const GameScene = () => {
  return (
    <pixiContainer>
      <GrassMap />
      <GardenGrid />
      <LeafSprite />
    </pixiContainer>
  );
};

export default GameScene;
