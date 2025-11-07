import { useState, useEffect } from "react";

export default function Timer({ time, start }) {
  const [seconds, setSeconds] = useState(null);
  useEffect(() => {
    if (start && time > 0) {
      setSeconds(time);

      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval); // ✅ stop when reaching 0
            time = 0;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // ✅ cleanup on unmount or re-render
    }
  }, [start, time]);

  return (
    <div>
      <h1>Timer: {seconds ? seconds : time}</h1>
    </div>
  );
}
