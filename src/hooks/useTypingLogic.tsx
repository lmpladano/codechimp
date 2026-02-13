import type { Dispatch, KeyboardEvent, SetStateAction } from "react";
import type { Char } from "../types/Char";

type SetChars = Dispatch<SetStateAction<Char[]>>;
type SetIndex = Dispatch<SetStateAction<number>>;
type StatsDelta = {
  correctDelta: number;
  incorrectDelta: number;
  keystroke: number;
};

export default function TypingLogic(
  current: Char[],
  setCurrent: SetChars,
  index: number,
  setIndex: SetIndex,
  onStatsChange?: (delta: StatsDelta) => void,
) {
  function countSpaces(): number {
    let count = 1;
    let nextIndex = index + 1;

    while (nextIndex < current.length && current[nextIndex].char === " ") {
      count++;
      nextIndex++;
    }

    return count;
  }
  function handleChange(e: KeyboardEvent<HTMLTextAreaElement>) {
    const input = e.key;

    if (input === "Enter") {
      const count = countSpaces();
      let correctDelta = 0;
      let incorrectDelta = 0;
      setCurrent((prev) => {
        return prev.map((item, i) => {
          if (i >= index && i < index + count) {
            const nextStatus =
              item.char === " " || item.char === "\n" ? "correct" : "incorrect";
            if (item.status !== "correct" && nextStatus === "correct") {
              correctDelta++;
            }
            if (item.status === "correct" && nextStatus !== "correct") {
              correctDelta--;
            }
            if (item.status !== "incorrect" && nextStatus === "incorrect") {
              incorrectDelta++;
            }
            if (item.status === "incorrect" && nextStatus !== "incorrect") {
              incorrectDelta--;
            }
            return {
              ...item,
              status: nextStatus,
            };
          }
          return item;
        });
      });
      onStatsChange?.({ correctDelta, incorrectDelta, keystroke: 1 });

      setIndex((prevIndex) => prevIndex + count);
    }

    if (input == "Backspace") {
      let correctDelta = 0;
      let incorrectDelta = 0;
      setIndex((prev) => prev - 1);
      setCurrent((prev) =>
        prev.map((item) =>
          item.index === index - 1
            ? (() => {
                if (item.status === "correct") {
                  correctDelta--;
                }
                if (item.status === "incorrect") {
                  incorrectDelta--;
                }
                return { ...item, status: "pending" };
              })()
            : item,
        ),
      );
      onStatsChange?.({ correctDelta, incorrectDelta, keystroke: 1 });
    }

    if (input.length === 1) {
      let correctDelta = 0;
      let incorrectDelta = 0;
      setCurrent((prev) =>
        prev.map((item, i) =>
          i === index
            ? (() => {
                const nextStatus = input === item.char ? "correct" : "incorrect";
                if (item.status !== "correct" && nextStatus === "correct") {
                  correctDelta++;
                }
                if (item.status === "correct" && nextStatus !== "correct") {
                  correctDelta--;
                }
                if (item.status !== "incorrect" && nextStatus === "incorrect") {
                  incorrectDelta++;
                }
                if (item.status === "incorrect" && nextStatus !== "incorrect") {
                  incorrectDelta--;
                }
                return { ...item, status: nextStatus };
              })()
            : item,
        ),
      );
      onStatsChange?.({ correctDelta, incorrectDelta, keystroke: 1 });
      setIndex(index + 1);
    }
  }
  return handleChange;
}
