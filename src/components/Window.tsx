import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Letter from "./Letter";

type Char = {
  ref: object;
  char: string;
  status: string;
  index: number;
};

export default function Window({ text, next }) {
  const [localText, setLocalText] = useState(text);
  const [target, setTarget] = useState(
    localText.split("").map((letter: string, i: number) => {
      return { char: letter, status: "pending", index: i };
    })
  );
  const [valid, setValid] = useState(0);
  const [index, setIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({});
  const letterRef = useRef([]);
  const inputRef = useRef(null);
  useEffect(() => {
    setLocalText(text);
  }, [text]);

  useEffect(() => {
    inputRef.current.focus();
    // let currentCursor = letterRef.current[index].getBoundingClientRect();
    // cursorPos <= target.length
    //   ? null
    //   : setCursorPos({ left: currentCursor.x, top: currentCursor.y });
  }, [index]);

  function countSpaces(): number {
    let count = 1;
    let nextIndex = index + 1;

    while (nextIndex < target.length && target[nextIndex].char === " ") {
      count++;
      nextIndex++;
    }

    return count;
  }

  function handleChange(e) {
    const input = e.key;

    if (input === "Enter") {
      let count = countSpaces();
      setTarget((prev) => {
        return prev.map((item, i) => {
          if (i >= index && i < index + count) {
            return {
              ...item,
              status: item.char === " " ? "correct" : "incorrect",
            };
          }
          return item;
        });
      });

      setIndex((prevIndex) => prevIndex + count);
    }

    if (input == "Backspace") {
      setIndex((prev) => prev - 1);
      setTarget((prev) =>
        prev.map((item) =>
          item.index === index - 1 ? { ...item, status: "pending" } : item
        )
      );
    }

    if (input.length === 1) {
      setTarget((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, status: input === item.char ? "correct" : "incorrect" }
            : item
        )
      );
      setIndex(index + 1);
    }

    if (index === target.length) {
      for (let letter of target) {
        console.log(letter);
        letter.status == "correct" ? setValid((prev) => prev + 1) : null;
      }
      next((prev) => prev + 1);
      setIndex(0);
    }
  }

  const word = target.map((item: Char) => (
    <Letter
      ref={(el) => (letterRef.current[item.index] = el)}
      status={item.status}
      index={item.index}
      txt={item.char}
    />
  ));
  return (
    <>
      <h1 className="text-white">{valid}</h1>
      <div className="flex flex-row flex-wrap items-start w-180 bg-[#1a1a1a] ">
        <div
          className={`absolute w-0.5 h-8 bg-[#ffffff] transition-all duration-250 z-10`}
          style={{ left: cursorPos.left, top: cursorPos.top }}
        />
        {word}
      </div>
      <textarea
        onKeyDown={handleChange}
        ref={inputRef}
        className="cursor-pointer bg-[#bd1d1d87] w-180 h-100 absolute opacity-0"
      />
    </>
  );
}
