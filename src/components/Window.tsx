import { useState } from "react";
import Letter from "./Letter";

type Char = {
  char: string;
  status: string;
  index: number;
};

export default function Window({ text }) {
  const [target, setTarget] = useState(
    text.split("").map((letter: string, i: number) => {
      return { char: letter, status: "pending", index: i };
    })
  );
  const [index, setIndex] = useState(0);

  function handleChange(e) {
    const input = e.key;
    if (input === target[index].char) {
      setTarget((prev) =>
        prev.map((item) =>
          item.index === index ? { ...item, status: "correct" } : item
        )
      );
      setIndex(index + 1);
    } else {
      console.log(target[index]);
      console.log("false");
    }
  }

  console.log(target);

  const word = target.map((item: Char) => (
    <Letter status={item.status} index={item.index} txt={item.char} />
  ));
  return (
    <>
      <h1>hello</h1>
      <div className="flex flex-row">{word}</div>
      <textarea
        onKeyDown={handleChange}
        className="h-10 bg-[#63ffe2b0] absolute top-120"
      />
    </>
  );
}
