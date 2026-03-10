import { useTimerCountdown } from "../../hooks/useTimerCountdown";
import { useRoomStore } from "../../store/useRoomStore";
import { wsService } from "../../services/wsService";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TimerPanel = () => {
  useTimerCountdown();

  const remaining = useRoomStore((s) => s.timer.remaining);
  const timerRunning = useRoomStore((s) => s.timer.timerRunning);
  const timerMode = useRoomStore((s) => s.timer.timerMode);

  const handleToggle = () => {
    if (timerRunning) {
      wsService.send("timer_stop", {});
    } else {
      wsService.send("timer_start", {});
    }
  };

  const isFocus = timerMode === "focus";

  return (
    <div className="pointer-events-auto bg-amber-100 border-4 border-amber-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] px-6 py-4 flex flex-col items-center gap-3">
      <span
        className={`font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 ${isFocus ? "bg-green-700 text-amber-100" : "bg-blue-600 text-amber-100"}`}
      >
        {timerMode}
      </span>

      <span className="font-mono text-4xl font-bold text-amber-900 tabular-nums drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]">
        {formatTime(remaining)}
      </span>

      <button
        onClick={handleToggle}
        className="pointer-events-auto bg-green-700 border-2 border-green-900 text-amber-100 font-mono font-bold px-5 py-2 uppercase tracking-wider shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] active:shadow-none transition-all"
      >
        {timerRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default TimerPanel;
