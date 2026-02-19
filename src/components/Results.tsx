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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 text-white backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#121212] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.55)] sm:p-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Session Complete</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Your Results</h2>
        <p className="mt-2 text-sm text-white/60">Great run. Review your metrics and start another round.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">WPM</p>
            <p className="mt-2 text-3xl font-semibold">{wpm}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Keystrokes</p>
            <p className="mt-2 text-3xl font-semibold">{totalKeystrokes}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Correct</p>
            <p className="mt-2 text-3xl font-semibold text-emerald-300">{correctChars}</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">Incorrect</p>
            <p className="mt-2 text-3xl font-semibold text-rose-300">{incorrectChars}</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <button
            className="cursor-pointer rounded-lg border border-[#a200ff]/60 bg-[#a200ff]/20 px-4 py-2 font-medium transition-colors hover:bg-[#a200ff]/35"
            onClick={onRestart}
          >
            Restart Test
          </button>
          <button
            className="cursor-pointer rounded-lg border border-white/30 bg-transparent px-4 py-2 font-medium text-white/90 transition-colors hover:bg-white/10"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
