export default function Header() {
  return (
    <div className="flex h-15 items-center justify-between bg-black px-10 text-2xl text-amber-50">
      <div>
        <p className="font-mono tracking-tight">
          <span className="text-[#a200ff]">Code</span>
          <span className="text-amber-50">Chimp</span>
        </p>
      </div>
      <a
        href="https://github.com/lmpladano/codechimp"
        target="_blank"
        rel="noreferrer"
        aria-label="Open GitHub repository"
        className="text-[#a200ff] transition-opacity hover:opacity-80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="currentColor"
        >
          <path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.1-.74.09-.73.09-.73 1.2.08 1.84 1.25 1.84 1.25 1.08 1.85 2.83 1.32 3.52 1 .1-.79.42-1.32.76-1.63-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.24-.12-.3-.54-1.52.12-3.16 0 0 1.01-.33 3.3 1.24a11.3 11.3 0 0 1 6 0c2.28-1.57 3.29-1.24 3.29-1.24.66 1.64.24 2.86.12 3.16.77.85 1.24 1.93 1.24 3.24 0 4.62-2.81 5.65-5.49 5.95.43.38.82 1.12.82 2.27v3.37c0 .32.22.69.83.58A12 12 0 0 0 12 .297" />
        </svg>
      </a>
    </div>
  );
}
