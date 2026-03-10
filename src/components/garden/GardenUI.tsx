import { TimerDisplay, TimerControls } from "./TimerPanel";
import ChatPanel from "./ChatPanel";

const GameUI = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="flex justify-center pt-6">
        <TimerDisplay />
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
        <TimerControls />
      </div>
      <div className="absolute bottom-4 right-4">
        <ChatPanel />
      </div>
    </div>
  );
};

export default GameUI;
