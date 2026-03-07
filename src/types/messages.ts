export type MessageType =
  | "join"
  | "chat"
  | "user_joined"
  | "user_left"
  | "room_snapshot"
  | "timer_start"
  | "timer_stop"
  | "timer_state_change"
  | "timer_tick";

export type TimerMode = "focus" | "break";

export interface TimerStatePayload {
  endsAt: number;
  remaining: number;
  timerRunning: boolean;
  timerMode: TimerMode;
}

export interface TimerStartPayload {
  endsAt: number;
}

export interface UserJoinedPayload {
  id: string;
  username: string;
  slot: number;
}

export interface UserLeftPayload {
  id: string;
}

export interface ChatBroadcastPayload {
  id: string;
  username: string;
  body: string;
  ts: number;
}

export interface RoomSnapshotPayload {
  users: UserJoinedPayload[];
  timer: TimerStatePayload;
}

export type IncomingMessage =
  | { type: "room_snapshot"; payload: RoomSnapshotPayload }
  | { type: "user_joined"; payload: UserJoinedPayload }
  | { type: "user_left"; payload: UserLeftPayload }
  | { type: "chat"; payload: ChatBroadcastPayload }
  | { type: "timer_start"; payload: TimerStartPayload }
  | { type: "timer_stop"; payload: TimerStatePayload }
  | { type: "timer_state_change"; payload: TimerStatePayload }
  | { type: "timer_tick"; payload: TimerStatePayload };
