import { useState, useEffect } from "react";

type TimerProps = {
  time: number; // starting seconds
  start: boolean;
  onComplete?: () => void;
  onTick?: (seconds: number) => void;
};

export default function Timer({ time, start, onComplete, onTick }: TimerProps) {
  const [seconds, setSeconds] = useState<number>(time);

  function formatTime(value: number) {
    const mins = Math.floor(value / 60)
      .toString()
      .padStart(2, "0");
    const secs = (value % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  useEffect(() => {
    if (start) return;
    setSeconds(time);
    onTick?.(time);
  }, [time, start, onTick]);

  useEffect(() => {
    if (!start) return;

    setSeconds(time);
    onTick?.(time);

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        const next = prev - 1;

        if (prev <= 1) {
          clearInterval(intervalId);
          onComplete?.();
          onTick?.(0);
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start, time, onComplete, onTick]);

  return (
    <div className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2">
      <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
        Timer
      </span>
      <h1 className="font-mono text-2xl font-semibold tracking-wide text-white">
        {formatTime(seconds)}
      </h1>
    </div>
  );
}
