import { useState, useEffect, useRef } from "react";
import Fetch from "../hooks/data/useFetch";
import TypingLogic from "../hooks/useTypingLogic";
import Cursor from "./Cursor";
import Letter from "./Letter";
import type { Char } from "../types/Char";

export default function Window() {
  const [current, setCurrent] = useState([]);
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const letterRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const data = Fetch();

  useEffect(() => {
    setCurrent(data);
  }, [data]);

  const handleChange = TypingLogic(current, setCurrent, index, setIndex);
  return (
    <>
      <div className="flex flex-row flex-wrap items-start w-180 bg-[#1a1a1a] ">
        <Cursor index={index} letterRef={letterRef} />
        {current.map((item: Char) => (
          <Letter
            key={item.index}
            ref={(el: HTMLParagraphElement) => {
              letterRef.current[item.index] = el;
            }}
            status={item.status}
            index={item.index}
            txt={item.char}
          />
        ))}
      </div>
      <textarea
        onKeyDown={handleChange}
        ref={inputRef}
        className="cursor-pointer bg-[#bd1d1d87] w-180 h-100 absolute opacity-0"
      />
    </>
  );
}
