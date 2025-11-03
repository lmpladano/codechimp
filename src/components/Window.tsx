import { useState, useEffect, useRef } from "react";
import Fetch from "../hooks/data/useFetch";
import TypingLogic from "../hooks/useTypingLogic";
import Cursor from "./Cursor";
import Letter from "./Letter";
import type { Char } from "../types/Char";

export default function Window() {
  const [current, setCurrent] = useState([]);
  const [queue, setQueue] = useState([]);
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const letterRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const data = Fetch();

  function getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  function grabTest(data: { content: string }[], index: number) {
    return data[index].content.split("").map((letter, i) => ({
      char: letter,
      status: "pending",
      index: i,
    }));
  }

  useEffect(() => {
    if (data.length === 0) return;

    const currentIndex = getRandomIndex(data.length);
    const queueIndex = getRandomIndex(data.length);

    setCurrent(grabTest(data, currentIndex));
    setQueue(grabTest(data, queueIndex));
  }, [data]);

  useEffect(() => {
    if (current.length === 0) return;
    if (index >= current.length) {
      setCurrent(queue);
      setIndex(0);

      const nextIndex = getRandomIndex(data.length);
      setQueue(grabTest(data, nextIndex));
    }
  }, [index, current.length, data]);

  const handleChange = TypingLogic(current, setCurrent, index, setIndex);
  return (
    <>
      <div className="flex flex-row flex-wrap items-start w-180">
        <Cursor index={index} letterRef={letterRef} />
        {current.map((item: Char) => (
          <Letter
            key={item.index}
            ref={(el: HTMLParagraphElement | null) => {
              letterRef.current[item.index] = el;
            }}
            status={item.status}
            char={item.char}
          />
        ))}
      </div>
      <div className="flex flex-row flex-wrap items-start w-180 mt-10">
        {queue.map((item: Char) => (
          <Letter key={item.index} status={item.status} char={item.char} />
        ))}
      </div>
      <textarea
        onKeyDown={handleChange}
        ref={inputRef}
        className="cursor-pointer bg-[#00000000] w-180 h-100 absolute opacity-0"
      />
    </>
  );
}
