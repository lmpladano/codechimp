import Letter from "./Letter";
import type { Char } from "../types/Char";

type QueueProps = {
  txt: Char[];
};

export default function Queue({ txt }: QueueProps) {
  const words = txt.map((item) => (
    <Letter key={item.index} status={item.status} char={item.char} />
  ));

  return <>{words}</>;
}
