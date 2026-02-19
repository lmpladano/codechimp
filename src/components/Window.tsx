import { useState, useEffect, useRef, useMemo } from "react";
import useFetch from "../hooks/data/useFetch";
import TypingLogic from "../hooks/useTypingLogic";
import Cursor from "./Cursor";
import Letter from "./Letter";
import Info from "./Info";
import type { Char } from "../types/Char";

type TestText = { content: string };

export default function Window() {
  const [language, setLanguage] = useState("javascript");
  const [current, setCurrent] = useState<Char[]>([]);
  const [queue, setQueue] = useState<Char[]>([]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(false);
  const [awaitingNextSnippet, setAwaitingNextSnippet] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [finalizedIncorrectChars, setFinalizedIncorrectChars] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const letterRef = useRef<(HTMLParagraphElement | null)[]>([]);

  const data = useFetch(language) as TestText[];

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

  const currentIncorrectChars = useMemo(
    () => current.filter((item) => item.status === "incorrect").length,
    [current],
  );

  const totalIncorrectChars = finalizedIncorrectChars + currentIncorrectChars;

  function advanceToNextSnippet() {
    if (queue.length === 0) return;

    const snippetIncorrect = current.filter(
      (item) => item.status === "incorrect",
    ).length;
    setFinalizedIncorrectChars((prev) => prev + snippetIncorrect);

    setCurrent(queue);
    setIndex(0);
    setAwaitingNextSnippet(false);
    letterRef.current = [];

    if (data.length > 0) {
      const nextIndex = getRandomIndex(data.length);
      setQueue(grabTest(data, nextIndex));
    }
  }

  useEffect(() => {
    if (data.length === 0) return;

    const currentIndex = getRandomIndex(data.length);
    const queueIndex = getRandomIndex(data.length);

    setCurrent(grabTest(data, currentIndex));
    setQueue(grabTest(data, queueIndex));
    setIndex(0);
    setAwaitingNextSnippet(false);
  }, [data]);

  useEffect(() => {
    if (current.length === 0) return;
    if (index >= current.length && !awaitingNextSnippet) {
      setAwaitingNextSnippet(true);
    }
  }, [index, current, awaitingNextSnippet]);

  const handleChange = TypingLogic(
    current,
    setCurrent,
    index,
    setIndex,
    ({ correctDelta, keystroke }) => {
      if (correctDelta !== 0) {
        setCorrectChars((prev) => Math.max(0, prev + correctDelta));
      }
      if (keystroke !== 0) {
        setTotalKeystrokes((prev) => prev + keystroke);
      }
    },
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isResultsOpen) return;

    if (awaitingNextSnippet) {
      if (e.key === "Enter") {
        advanceToNextSnippet();
      }
      return;
    }

    // start session on first "real" typing key
    if (!start && (e.key.length === 1 || e.key === "Enter")) {
      setStart(true);
    }
    handleChange(e);
  };

  function handleRestart() {
    setStart(false);
    setIndex(0);
    setAwaitingNextSnippet(false);
    setCorrectChars(0);
    setFinalizedIncorrectChars(0);
    setTotalKeystrokes(0);
    letterRef.current = [];
    if (data.length > 0) {
      const currentIndex = getRandomIndex(data.length);
      const queueIndex = getRandomIndex(data.length);
      setCurrent(grabTest(data, currentIndex));
      setQueue(grabTest(data, queueIndex));
    }
    inputRef.current?.focus();
  }

  function handleLanguageChange(nextLanguage: string) {
    setLanguage(nextLanguage);
    setStart(false);
    setIndex(0);
    setAwaitingNextSnippet(false);
    setCorrectChars(0);
    setFinalizedIncorrectChars(0);
    setTotalKeystrokes(0);
    letterRef.current = [];
  }

  return (
    <>
      <Info
        start={start}
        correctChars={correctChars}
        incorrectChars={totalIncorrectChars}
        totalKeystrokes={totalKeystrokes}
        onRestart={handleRestart}
        language={language}
        onLanguageChange={handleLanguageChange}
        onResultsVisibilityChange={setIsResultsOpen}
      />
      <div className="w-full max-w-[1000px] rounded-2xl bg-black p-5">
        <textarea
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={isResultsOpen}
          className="cursor-pointer bg-[#00000000] w-180 h-100 absolute opacity-0"
        />
        <div className="flex flex-row flex-wrap items-start w-200">
          <Cursor
            index={index}
            letterRef={letterRef}
            current={current}
            awaitingNextSnippet={awaitingNextSnippet}
          />
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
