import { useState, useEffect, type RefObject } from "react";

export default function CursorMove(index: number, letterRef: RefObject<any>) {
  const [cursorPos, setCursorPos] = useState({});
  useEffect(() => {
    if (!letterRef.current) return;

    const node = letterRef.current[index];
    if (!node) {
      return;
    }

    const compass = node.getBoundingClientRect();
    setCursorPos({ left: compass.x, top: compass.y });
  }, [letterRef, index]);

  return cursorPos;
}
