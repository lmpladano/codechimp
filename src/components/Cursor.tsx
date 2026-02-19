import type { RefObject } from "react";
import useCursorPosition from "../hooks/useCursorMove";
import type { Char } from "../types/Char";

type CursorProps = {
  index: number;
  letterRef: RefObject<(HTMLParagraphElement | null)[]>;
  current: Char[];
  awaitingNextSnippet?: boolean;
};

export default function Cursor({
  index,
  letterRef,
  current,
  awaitingNextSnippet = false,
}: CursorProps) {
  const pos = useCursorPosition(index, letterRef, current, awaitingNextSnippet);

  if (!pos.visible) return null;

  if (pos.showReturnCue) {
    return (
      <div
        className="absolute z-10 text-xl font-bold text-[#ffffff] transition-all duration-250"
        style={{ left: pos.left, top: pos.top }}
      >
        ↓
      </div>
    );
  }

  return (
    <div
      className={`absolute w-0.5 h-8 bg-[#ffffff] transition-all duration-250 z-10`}
      style={{ left: pos.left, top: pos.top }}
    />
  );
}
