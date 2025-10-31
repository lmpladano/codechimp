export default function Letter({ txt, status, ref, index }) {
  const letterStyle = "text-md p-0.5 transition-all duration-250";
  const statusColor = {
    pending: `${letterStyle} text-[#FCF5FC]`,
    incorrect: `bg-[#ff6363] ${letterStyle} text-[#FCF5FC]`,
    correct: `bg-[#63ff] ${letterStyle} text-[#FCF5FC]`,
  };

  const coloredChars = ["(", ")", "{", "}", "[", "]", "+"];

  return (
    <p
      id={index}
      ref={ref}
      className={`${statusColor[status]} ${
        txt === "\n"
          ? "basis-full opacity-0"
          : coloredChars.includes(txt)
          ? "text-[#a200ff]"
          : ""
      }`}
    >
      {txt === " " ? "\u00A0" : txt === "\n" ? null : txt}
    </p>
  );
}
