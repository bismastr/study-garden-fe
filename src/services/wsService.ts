import { useRoomStore } from "../store/useRoomStore";
import type { IncomingMessage } from "../types/messages";

const MAX_RETRIES = 6;
const BASE_DELAY_MS = 1000;
const MAX_DELAY_MS = 30_000;

class WsService {
  private ws: WebSocket | null = null;
  private roomNumber = "";
  private retryCount = 0;
  private shouldReconnect = false;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  connect(roomNumber: string): void {
    this.roomNumber = roomNumber;
    this.shouldReconnect = true;
    this.retryCount = 0;
    this.openSocket();
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.retryTimer !== null) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send<T>(type: string, payload: T): void {
    if (this.ws?.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify({ type, payload }));
  }

  private openSocket(): void {
    const url = `ws://localhost:8080/room/${this.roomNumber}`;
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.retryCount = 0;
      useRoomStore.getState().setConnected(true);

      const { username } = useRoomStore.getState();
      this.send("join", { username });
    };

    this.ws.onmessage = (event: MessageEvent) => {
      let parsed: IncomingMessage;
      try {
        parsed = JSON.parse(event.data as string) as IncomingMessage;
      } catch {
        return;
      }
      this.dispatch(parsed);
    };

    this.ws.onclose = () => {
      useRoomStore.getState().setConnected(false);
      if (this.shouldReconnect && this.retryCount < MAX_RETRIES) {
        const delay =
          Math.min(BASE_DELAY_MS * Math.pow(2, this.retryCount), MAX_DELAY_MS) +
          Math.random() * 1000;
        this.retryCount++;
        this.retryTimer = setTimeout(() => this.openSocket(), delay);
      }
    };

    this.ws.onerror = () => {
      // onclose will fire after onerror; let onclose handle reconnect
    };
  }

  private dispatch(msg: IncomingMessage): void {
    const store = useRoomStore.getState();

    switch (msg.type) {
      case "room_snapshot":
        store.applySnapshot(msg.payload.users, msg.payload.timer);
        break;
      case "user_joined":
        store.addUser(msg.payload);
        break;
      case "user_left":
        store.removeUser(msg.payload.id);
        break;
      case "chat":
        store.addMessage(msg.payload);
        break;
      case "timer_start":
        store.setTimer({ endsAt: msg.payload.endsAt, timerRunning: true });
        break;
      case "timer_stop":
      case "timer_state_change":
        store.setTimer(msg.payload);
        break;
      case "timer_tick":
        // no-op: server does not currently send this
        break;
    }
  }
}

export const wsService = new WsService();
