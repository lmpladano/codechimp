interface LetterProps {
  char: string;
  status: "pending" | "incorrect" | "correct";
  ref: (el: HTMLParagraphElement | null) => void;
}

export default function Letter({ char, status, ref }: LetterProps) {
  const letterStyle = "text-md p-0.5 transition-all duration-250";
  const statusColor = {
    pending: `${letterStyle} text-[#FCF5FC]`,
    incorrect: `bg-[#ff6363] ${letterStyle} text-[#FCF5FC]`,
    correct: `bg-[#2ACF00] ${letterStyle} text-[#FCF5FC]`,
  };

  const coloredChars = ["(", ")", "{", "}", "[", "]", "+"];

  return (
    <p
      ref={ref}
      className={`${statusColor[status]} ${
        char === "\n"
          ? "basis-full opacity-0"
          : coloredChars.includes(char)
          ? "text-[#a200ff]"
          : ""
      }`}
    >
      {char === " " ? "\u00A0" : char === "\n" ? null : char}
    </p>
  );
}
