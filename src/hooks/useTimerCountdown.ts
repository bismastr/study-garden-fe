import { useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";

export function useTimerCountdown(): void {
  const timerRunning = useRoomStore((s) => s.timer.timerRunning);
  const endsAt = useRoomStore((s) => s.timer.endsAt);
  const setTimer = useRoomStore((s) => s.setTimer);

  useEffect(() => {
    if (!timerRunning || endsAt <= 0) return;

    const tick = () => {
      const remaining = Math.max(0, endsAt - Math.floor(Date.now() / 1000));
      setTimer({ remaining });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timerRunning, endsAt, setTimer]);
}
