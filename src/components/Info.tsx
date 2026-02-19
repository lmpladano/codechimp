import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
} from "react";
import Results from "./Results";
import Timer from "./Timer";

type InfoProps = {
  start: boolean;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  onRestart: () => void;
  language: string;
  onLanguageChange: (language: string) => void;
  onResultsVisibilityChange?: (visible: boolean) => void;
};

export default function Info({
  start,
  correctChars,
  incorrectChars,
  totalKeystrokes,
  onRestart,
  language,
  onLanguageChange,
  onResultsVisibilityChange,
}: InfoProps) {
  const [select, setSelect] = useState(60);
  const [showResults, setShowResults] = useState(false);

  const handleComplete = useCallback(() => {
    setShowResults(true);
  }, []);

  const handleRestart = useCallback(() => {
    setShowResults(false);
    onRestart();
  }, [onRestart]);

  useEffect(() => {
    setShowResults(false);
  }, [language]);

  useEffect(() => {
    onResultsVisibilityChange?.(showResults);
  }, [showResults, onResultsVisibilityChange]);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setSelect(Number(e.currentTarget.value));
  }

  function handleLanguageClick(e: MouseEvent<HTMLButtonElement>) {
    onLanguageChange(e.currentTarget.value);
  }

  const wpm = useMemo(() => {
    const minutes = select / 60;
    if (minutes <= 0) return 0;
    return (correctChars / 5) / minutes;
  }, [correctChars, select]);

  const displayedWpm = Number.isFinite(wpm) ? Math.round(wpm) : 0;

  const selectBtnClass =
    "cursor-pointer rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.08] hover:text-white";

  const timerActiveBtnClass = "bg-[#a200ff]/25";
  const languageActiveBtnClass = "bg-[#a200ff]/25";
  const languageBtnClass =
    "cursor-pointer rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white/80 transition-all hover:bg-white/[0.08] hover:text-white";

  function getBtnClass(value: number) {
    return `${selectBtnClass} ${select === value ? timerActiveBtnClass : ""}`;
  }

  function getLanguageBtnClass(value: string) {
    return `${languageBtnClass} ${language === value ? languageActiveBtnClass : ""}`;
  }

  return (
    <>
      <div className="m-10 flex w-full max-w-[1000px] flex-col gap-5 rounded-2xl border border-white/10 bg-black p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            Language
          </p>
          <button
            onClick={handleLanguageClick}
            className={getLanguageBtnClass("javascript")}
            value="javascript"
          >
            JavaScript
          </button>
          <button
            onClick={handleLanguageClick}
            className={getLanguageBtnClass("python")}
            value="python"
          >
            Python
          </button>
          <button
            onClick={handleLanguageClick}
            className={getLanguageBtnClass("c")}
            value="c"
          >
            C
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
              Duration
            </p>
            <button onClick={handleClick} className={getBtnClass(15)} value={15}>
              15s
            </button>
            <button onClick={handleClick} className={getBtnClass(30)} value={30}>
              30s
            </button>
            <button onClick={handleClick} className={getBtnClass(60)} value={60}>
              60s
            </button>
          </div>
          <Timer time={select} start={start} onComplete={handleComplete} />
        </div>
      </div>
      {showResults ? (
        <Results
          wpm={displayedWpm}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          totalKeystrokes={totalKeystrokes}
          onClose={() => setShowResults(false)}
          onRestart={handleRestart}
        />
      ) : null}
    </>
  );
}
