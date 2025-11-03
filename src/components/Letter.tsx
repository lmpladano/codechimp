interface LetterProps {
  char: string;
  status: "pending" | "incorrect" | "correct";
  ref: (el: HTMLParagraphElement | null) => void;
}

export default function Letter({ char, status, ref }: LetterProps) {
  const letterStyle = "text-xl p-0.5 transition-all duration-250";
  const statusColor = {
    pending: `${letterStyle} text-[#B0B0B0]`,
    incorrect: `${letterStyle} bg-[#ff6363] text-[#FCF5FC]`,
    correct: `${letterStyle} text-[#F5EDF5]`,
  };

  const coloredChars = ["(", ")", "{", "}", "[", "]", "+"];

  return (
    <p
      ref={ref}
      className={`${statusColor[status]} ${
        char === "\n"
          ? "basis-full opacity-0 h-2"
          : coloredChars.includes(char)
          ? "text-[#a200ff]"
          : ""
      }`}
    >
      {char === " " ? "\u00A0" : char === "\n" ? null : char}
    </p>
  );
}
