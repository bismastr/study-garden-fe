import { useEffect } from "react";
import { wsService } from "../services/wsService";

export function useWebSocket(roomNumber: string): void {
  useEffect(() => {
    wsService.connect(roomNumber);
    return () => wsService.disconnect();
  }, [roomNumber]);
}
