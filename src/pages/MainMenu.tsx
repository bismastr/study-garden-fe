import { useState, useEffect, useRef } from "react";
import { useRoomStore } from "@/store/useRoomStore";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { Label } from "@/components/ui/8bit/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/8bit/card";

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
        const savedUsername = sessionStorage.getItem("sg_username") ?? "";
        const savedRoom = sessionStorage.getItem("sg_room") ?? "";
        if (!savedUsername.trim()) {
            usernameRef.current?.focus();
        } else if (!savedRoom.trim()) {
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
        <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Study Garden</CardTitle>
                    <CardDescription>
                        Grow together, one pomodoro at a time
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                ref={usernameRef}
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="e.g. sprout42"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="room">Room Number</Label>
                            <Input
                                ref={roomRef}
                                id="room"
                                type="text"
                                value={room}
                                onChange={(e) => setRoom(e.target.value)}
                                placeholder="e.g. 1"
                            />
                        </div>

                        {error && <p className="retro text-destructive text-xs">{error}</p>}
                    </CardContent>

                    <CardFooter>
                        <Button
                            type="submit"
                            disabled={!isValid}
                            className="w-full"
                            size="lg"
                        >
                            Join Garden
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
