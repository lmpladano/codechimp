import { useState, useEffect } from "react";

export default function Timer({ time }) {
  const [count, setCount] = useState(Number(time)); // State to store the current number

  useEffect(() => {
    // Set up the timeout when the component mounts
    const timerId = setTimeout(() => {
      setCount((prevCount) => prevCount - 1); // Increment the count after 1 second
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup function to clear the timeout when the component unmounts
    return () => clearTimeout(timerId);
  }, [count]); // Re-run the effect whenever 'count' changes

  return (
    <div>
      <h1>Timer: {count}</h1>
    </div>
  );
}
