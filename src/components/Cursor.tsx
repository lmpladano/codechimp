import useCursorPosition from "../hooks/useCursorMove";

export default function Cursor({ index, letterRef }) {
  const pos = useCursorPosition(index, letterRef);
  return (
    <div
      className={`absolute w-0.5 h-8 bg-[#ffffff] transition-all duration-250 z-10`}
      style={{ left: pos.left, top: pos.top }}
    />
  );
}
