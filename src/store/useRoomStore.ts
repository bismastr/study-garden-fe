import { create } from "zustand";
import type {
  UserJoinedPayload,
  ChatBroadcastPayload,
  TimerStatePayload,
  TimerMode,
} from "../types/messages";

interface TimerSlice {
  endsAt: number;
  remaining: number;
  timerRunning: boolean;
  timerMode: TimerMode;
}

interface RoomState {
  phase: "menu" | "game";
  username: string;
  roomNumber: string;
  users: UserJoinedPayload[];
  messages: ChatBroadcastPayload[];
  timer: TimerSlice;
  connected: boolean;

  setPhase: (phase: "menu" | "game") => void;
  setConnected: (connected: boolean) => void;
  setUsername: (username: string) => void;
  setRoomNumber: (roomNumber: string) => void;
  applySnapshot: (users: UserJoinedPayload[], timer: TimerStatePayload) => void;
  addUser: (user: UserJoinedPayload) => void;
  removeUser: (id: string) => void;
  addMessage: (message: ChatBroadcastPayload) => void;
  setTimer: (patch: Partial<TimerSlice>) => void;
}

export const useRoomStore = create<RoomState>((set) => ({
  phase: "menu",
  username: "",
  roomNumber: "",
  users: [],
  messages: [],
  timer: {
    endsAt: 0,
    remaining: 1500,
    timerRunning: false,
    timerMode: "focus",
  },
  connected: false,

  setPhase: (phase) => set({ phase }),
  setConnected: (connected) => set({ connected }),
  setUsername: (username) => set({ username }),
  setRoomNumber: (roomNumber) => set({ roomNumber }),

  applySnapshot: (users, timer) =>
    set({
      users,
      timer: {
        endsAt: timer.endsAt,
        remaining: timer.remaining,
        timerRunning: timer.timerRunning,
        timerMode: timer.timerMode,
      },
    }),

  addUser: (user) =>
    set((state) => ({
      users: [...state.users.filter((u) => u.id !== user.id), user],
    })),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages.slice(-199), message],
    })),

  setTimer: (patch) =>
    set((state) => ({
      timer: { ...state.timer, ...patch },
    })),
}));
