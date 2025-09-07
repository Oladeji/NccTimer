"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function TimerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMinutes = parseInt(searchParams.get("m") || "0", 10);
  const initialSeconds = parseInt(searchParams.get("s") || "0", 10);
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60 + initialSeconds);
  const [running, setRunning] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [addMinutes, setAddMinutes] = useState(0);
  const [addSeconds, setAddSeconds] = useState(0);
  const [heading, setHeading] = useState("NCC Countdown Timer");
  const [timerSize, setTimerSize] = useState(5); // 5xl default
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Countdown effect
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      router.replace("/flash");
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, timeLeft, router]);


  function handleSettingsSave(e: React.FormEvent) {
    e.preventDefault();
    setTimeLeft((t) => t + addMinutes * 60 + addSeconds);
    setShowSettings(false);
  }

  function handleCancel() {
    setRunning(false);
    router.push("/");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen relative w-full">
      {/* Settings button at top right */}
      <button
        className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 shadow"
        onClick={() => setShowSettings(true)}
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>


      <h1 className="text-3xl font-bold mb-4">{heading}</h1>
      <div
        className="font-mono"
        style={{
          fontSize: `clamp(2rem, ${timerSize * 6}vw, 20rem)`,
          marginTop: '7rem',
          marginBottom: '7rem',
          lineHeight: 1.1,
          fontWeight: 700,
          letterSpacing: '0.05em',
          textAlign: 'center',
        }}
      >
        {formatTime(timeLeft)}
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <a href="/flash" className="mt-6 underline text-blue-700">
        Go to Flash Message
      </a>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSettingsSave}
            className="bg-amber-50 rounded-lg shadow-lg p-6 flex flex-col gap-4 min-w-[300px] "
          >
            <h2 className="text-xl font-semibold mb-2  text-gray-800">Settings</h2>
            <div>
              <label className="block mb-1 font-bold text-gray-800">Add Minutes:</label>
              <input
                type="number"
                min="0"
                value={addMinutes}
                onChange={e => setAddMinutes(Number(e.target.value))}
                className="border-2 border-gray-700 rounded px-2 py-1 w-full text-red-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-800">Add Seconds:</label>
              <input
                type="number"
                min="0"
                max="59"
                value={addSeconds}
                onChange={e => setAddSeconds(Number(e.target.value))}
                className="border-2 border-gray-700 rounded px-2 py-1 w-full text-red-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-800">Heading:</label>
              <input
                type="text"
                value={heading}
                onChange={e => setHeading(e.target.value)}
                className="border-2 border-gray-700 rounded px-2 py-1 w-full text-red-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-bold text-gray-800">Timer Size (1-9):</label>
              <input
                type="number"
                min="1"
                max="9"
                value={timerSize}
                onChange={e => setTimerSize(Number(e.target.value))}
                className="border-2 border-gray-700 rounded px-2 py-1 w-full text-red-600"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded flex-1"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded flex-1"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
