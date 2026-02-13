type ResultsProps = {
  wpm: number;
  correctChars: number;
  incorrectChars: number;
  totalKeystrokes: number;
  onClose: () => void;
  onRestart: () => void;
};

export default function Results({
  wpm,
  correctChars,
  incorrectChars,
  totalKeystrokes,
  onClose,
  onRestart,
}: ResultsProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 text-white">
      <div className="w-full max-w-md rounded-xl bg-[#131313] p-8 shadow-xl">
        <h2 className="text-3xl font-semibold">Test Complete</h2>
        <div className="mt-6 space-y-3 text-lg">
          <p>WPM: {wpm}</p>
          <p>Right Characters: {correctChars}</p>
          <p>Wrong Characters: {incorrectChars}</p>
          <p>Total Keystrokes: {totalKeystrokes}</p>
        </div>
        <div className="mt-8 flex gap-3">
          <button
            className="cursor-pointer rounded-md border border-amber-50/40 px-4 py-2 transition-colors hover:bg-amber-50/10"
            onClick={onRestart}
          >
            Restart
          </button>
          <button
            className="cursor-pointer rounded-md border border-amber-50/40 px-4 py-2 transition-colors hover:bg-amber-50/10"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
