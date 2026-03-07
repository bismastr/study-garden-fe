const GameUI = () => {
    return (
        <div className="absolute top-0 left-0 w-full p-3 flex gap-2 pointer-events-none">
            <button
                className="pointer-events-auto px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70"
                onClick={() => console.log("Settings clicked")}
            >
                ⚙ Settings
            </button>
            <button
                className="pointer-events-auto px-4 py-2 bg-black/50 text-white rounded hover:bg-black/70"
                onClick={() => console.log("Pause clicked")}
            >
                ⏸ Pause
            </button>
        </div>
    );
};

export default GameUI;
