import { useTimerCountdown } from "../../hooks/useTimerCountdown";
import { useRoomStore } from "../../store/useRoomStore";
import { wsService } from "../../services/wsService";
import { Pause, Play } from "lucide-react";

import { Card, CardContent } from "@/components/ui/8bit/card";
import { Badge } from "@/components/ui/8bit/badge";
import { Button } from "@/components/ui/8bit/button";
import { Progress } from "@/components/ui/8bit/progress";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const FOCUS_DURATION = 25 * 60;
const BREAK_DURATION = 5 * 60;

const TimerDisplay = () => {
  useTimerCountdown();

  const remaining = useRoomStore((s) => s.timer.remaining);
  const timerMode = useRoomStore((s) => s.timer.timerMode);

  const isFocus = timerMode === "focus";
  const totalDuration = isFocus ? FOCUS_DURATION : BREAK_DURATION;
  const elapsed = totalDuration - remaining;
  const progressValue = totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;

  return (
    <Card className="pointer-events-auto w-80 bg-card">
      <CardContent className="flex flex-col items-center gap-3 px-8 py-4">
        <Badge
          variant={isFocus ? "default" : "secondary"}
          className="text-[10px] uppercase tracking-widest"
        >
          {timerMode}
        </Badge>

        <span className="retro text-3xl font-bold tabular-nums text-foreground">
          {formatTime(remaining)}
        </span>

        <Progress
          value={progressValue}
          variant="retro"
          className="h-3 w-full"
          progressBg={isFocus ? "bg-primary" : "bg-secondary"}
        />
      </CardContent>
    </Card>
  );
};

const TimerControls = () => {
  const timerRunning = useRoomStore((s) => s.timer.timerRunning);

  const handleToggle = () => {
    if (timerRunning) {
      wsService.send("timer_stop", {});
    } else {
      wsService.send("timer_start", {});
    }
  };

  return (
    <Button
      onClick={handleToggle}
      variant="default"
      size="lg"
      className="pointer-events-auto px-16 py-5 text-base uppercase tracking-wider text-primary-foreground"
    >
      {timerRunning ? (
        <>
          <Pause className="size-5" />
          Pause
        </>
      ) : (
        <>
          <Play className="size-5" />
          Start
        </>
      )}
    </Button>
  );
};

export { TimerDisplay, TimerControls };
