import { useState, useEffect } from "react";

export default function CursorMove(index, letterRef) {
  const [cursorPos, setCursorPos] = useState({});
  useEffect(() => {
    if (!letterRef.current) return;

    const node = letterRef.current[index];
    if (!node) {
      console.log(node);
      return;
    }

    let compass = node.getBoundingClientRect();
    console.log(compass);
    setCursorPos({ left: compass.x, top: compass.y });
  }, [letterRef, index]);

  return cursorPos;
}
