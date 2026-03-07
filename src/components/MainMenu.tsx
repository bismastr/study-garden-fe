import { useState, useEffect, useRef } from "react";
import { useRoomStore } from "../store/useRoomStore";

export default function MainMenu() {
  const [username, setUsername] = useState(
    () => sessionStorage.getItem("sg_username") ?? "",
  );
  const [room, setRoom] = useState(
    () => sessionStorage.getItem("sg_room") ?? "",
  );
  const [error, setError] = useState("");

  const usernameRef = useRef<HTMLInputElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);
  const store = useRoomStore();

  const isValid = username.trim().length > 0 && room.trim().length > 0;

  useEffect(() => {
    const initialUsername = sessionStorage.getItem("sg_username") ?? "";
    const initialRoom = sessionStorage.getItem("sg_room") ?? "";
    if (!initialUsername.trim()) {
      usernameRef.current?.focus();
    } else if (!initialRoom.trim()) {
      roomRef.current?.focus();
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) {
      setError("Both username and room number are required.");
      return;
    }
    setError("");
    sessionStorage.setItem("sg_username", username.trim());
    sessionStorage.setItem("sg_room", room.trim());
    store.setUsername(username.trim());
    store.setRoomNumber(room.trim());
    store.setPhase("game");
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-b from-green-900 via-green-700 to-amber-200">
      <div className="bg-amber-50 border-2 border-green-400 rounded-3xl shadow-2xl p-12 w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 tracking-tight">
            Study Garden
          </h1>
          <p className="text-green-600 text-sm mt-1">
            Grow together, one pomodoro at a time
          </p>
          <div className="mx-auto mt-3 w-16 h-1 rounded bg-green-400" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-green-800"
              htmlFor="username"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. sprout42"
              className="bg-white border border-green-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              className="text-sm font-medium text-green-800"
              htmlFor="room"
            >
              Room Number
            </label>
            <input
              ref={roomRef}
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="e.g. 1"
              className="bg-white border border-green-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={!isValid}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl py-2.5 text-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
          >
            Join Garden
          </button>
        </form>
      </div>
    </div>
  );
}
