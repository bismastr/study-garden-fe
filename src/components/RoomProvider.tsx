import { useWebSocket } from "../hooks/useWebSocket";

interface RoomProviderProps {
  roomNumber: string;
  children: React.ReactNode;
}

export function RoomProvider({ roomNumber, children }: RoomProviderProps) {
  useWebSocket(roomNumber);
  return <>{children}</>;
}
