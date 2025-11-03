import useCursorPosition from "../hooks/useCursorMove";

type CursorProps = {
  index: number;
  letterRef: React.RefObject<(HTMLParagraphElement | null)[]>;
};

type Pos = {
  left: number;
  top: number;
};

export default function Cursor({ index, letterRef }: CursorProps) {
  const pos: Pos = useCursorPosition(index, letterRef);
  return (
    <div
      className={`absolute w-0.5 h-8 bg-[#ffffff] transition-all duration-250 z-10`}
      style={{ left: pos.left, top: pos.top }}
    />
  );
}
