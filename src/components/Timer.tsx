import { useState, useEffect } from "react";

type TimerProps = {
  time: number; // starting seconds (e.g., 60)
  start: boolean; // whether timer should run
  onComplete?: () => void; // optional callback when it hits 0
};

export default function Timer({ time, start, onComplete }: TimerProps) {
  const [seconds, setSeconds] = useState<number>(time);

  useEffect(() => {
    if (!start) return;

    setSeconds(time);

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start, time, onComplete]);

  return (
    <div>
      <h1>Timer: {seconds}</h1>
    </div>
  );
}
