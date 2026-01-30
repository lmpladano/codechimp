import { useState, useEffect, useRef } from "react";
import useFetch from "../hooks/data/useFetch";
import TypingLogic from "../hooks/useTypingLogic";
import Cursor from "./Cursor";
import Letter from "./Letter";
import Info from "./Info";
import type { Char } from "../types/Char";

type TestText = { content: string };

export default function Window() {
  const [current, setCurrent] = useState<Char[]>([]);
  const [queue, setQueue] = useState<Char[]>([]);
  const [index, setIndex] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const letterRef = useRef<(HTMLParagraphElement | null)[]>([]);

  // Temporary typing until we type the hook itself
  const data = useFetch() as TestText[];

  function getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  function grabTest(data: TestText[], index: number): Char[] {
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
  }, [index, current, queue, data]);

  const handleChange = TypingLogic(current, setCurrent, index, setIndex);

  return (
    <>
      <Info start={index > 0} />
      <div className="bg-[#131313] rounded-2xl p-5">
        <textarea
          onKeyDown={handleChange}
          ref={inputRef}
          className="cursor-pointer bg-[#00000000] w-180 h-100 absolute opacity-0"
        />
        <div className="flex flex-row flex-wrap items-start w-200">
          <Cursor index={index} letterRef={letterRef} />
          {current.map((item) => (
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
          {queue.map((item) => (
            <Letter key={item.index} status={item.status} char={item.char} />
          ))}
        </div>
      </div>
    </>
  );
}
