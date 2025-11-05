import { useState, useEffect } from "react";

export default function Timer({ time }) {
  const [count, setCount] = useState(Number(time));

  useEffect(() => {
    const timerId = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [count]);

  return (
    <div>
      <h1>Timer: {count}</h1>
    </div>
  );
}
