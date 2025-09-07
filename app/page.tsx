// Start page: input for minutes and seconds, start button
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Pass time as query params
    router.push(`/timer?m=${minutes}&s=${seconds}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Start Countdown Timer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
        <div>
          <label className="mr-2">Minutes:</label>
          <input type="number" min="0" value={minutes} onChange={e => setMinutes(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
        </div>
        <div>
          <label className="mr-2">Seconds:</label>
          <input type="number" min="0" max="59" value={seconds} onChange={e => setSeconds(Number(e.target.value))} className="border rounded px-2 py-1 w-20" />
        </div>
        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Start Timer</button>
      </form>
    </main>
  );
}
