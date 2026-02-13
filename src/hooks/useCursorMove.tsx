import { useState, useEffect, type RefObject } from "react";
import type { Char } from "../types/Char";

type CursorState = {
  left: number;
  top: number;
  visible: boolean;
  showReturnCue: boolean;
};

export default function CursorMove(
  index: number,
  letterRef: RefObject<(HTMLParagraphElement | null)[]>,
  current: Char[],
) {
  const [cursorPos, setCursorPos] = useState<CursorState>({
    left: 0,
    top: 0,
    visible: false,
    showReturnCue: false,
  });

  useEffect(() => {
    if (!letterRef.current || current.length === 0) {
      setCursorPos((prev) => ({ ...prev, visible: false, showReturnCue: false }));
      return;
    }

    const node = letterRef.current[index];
    if (!node) {
      setCursorPos((prev) => ({ ...prev, visible: false, showReturnCue: false }));
      return;
    }

    const currentChar = current[index]?.char;
    if (currentChar === "\n") {
      let previousIndex = index - 1;
      while (previousIndex >= 0 && current[previousIndex]?.char === "\n") {
        previousIndex--;
      }

      const previousNode = previousIndex >= 0 ? letterRef.current[previousIndex] : null;
      if (!previousNode) {
        setCursorPos((prev) => ({ ...prev, visible: false, showReturnCue: false }));
        return;
      }

      const previousCompass = previousNode.getBoundingClientRect();
      setCursorPos({
        left: previousCompass.right + 2,
        top: previousCompass.y,
        visible: true,
        showReturnCue: true,
      });
      return;
    }

    const compass = node.getBoundingClientRect();
    setCursorPos({
      left: compass.x,
      top: compass.y,
      visible: true,
      showReturnCue: false,
    });
  }, [letterRef, index, current]);

  return cursorPos;
}
