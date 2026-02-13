import { forwardRef } from "react";

interface LetterProps {
  char: string;
  status: "pending" | "incorrect" | "correct";
}

const Letter = forwardRef<HTMLParagraphElement, LetterProps>(
  ({ char, status }, ref) => {
    const letterStyle =
      "font-mono text-[18px] leading-7 px-[1px] transition-all duration-150";

    function getSyntaxColor(value: string): string {
      if (["(", ")", "{", "}", "[", "]"].includes(value)) return "#a200ff";
      if (["'", '"', "`"].includes(value)) return "#98c379";
      if (/[0-9]/.test(value)) return "#d19a66";
      if (/[+\-*/%=<>!&|^~?:]/.test(value)) return "#56b6c2";
      if (["#", "/"].includes(value)) return "#7f848e";
      if ([";", ",", "."].includes(value)) return "#9aa1ad";
      return "#c9d1d9";
    }

    const syntaxColor = getSyntaxColor(char);
    const letterClass =
      status === "incorrect"
        ? `${letterStyle} bg-[#ff6363] text-[#fff4f4]`
        : `${letterStyle} ${status === "pending" ? "opacity-80" : "opacity-100"}`;

    return (
      <p
        ref={ref}
        className={`${letterClass} ${char === "\n" ? "basis-full opacity-0 h-2" : ""}`}
        style={status === "incorrect" ? undefined : { color: syntaxColor }}
      >
        {char === " " ? "\u00A0" : char === "\n" ? null : char}
      </p>
    );
  },
);

Letter.displayName = "Letter";

export default Letter;
