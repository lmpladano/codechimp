import { useState, useEffect } from "react";
import Letter from "./Letter";

export default function Window({ text }) {
  const [target, setTarget] = useState(text.split(""));
  const [index, setIndex] = useState(0);

  console.log(target);

  function handleChange(e) {
    const newValue = e.nativeEvent.data;
    console.log(index);
    console.log(newValue);
    target[index] === newValue ? setIndex(index + 1) : null;
    !newValue ? setIndex(index - 1) : null;
  }
  const word = target.map((char) => <Letter txt={char} />);
  return (
    <>
      <h1>{target}</h1>
      <div className="flex flex-row">{word}</div>
      <textarea className="h-10 bg-[#63ffcb2c] absolute top-108" />
    </>
  );
}
