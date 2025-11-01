import { useState } from "react";
import Fetch from "./hooks/data/useFetch";
import Window from "./components/Window";
import Queue from "./components/Queue";

function App() {
  const [txt, setTxt] = useState(null);
  const [targetIndex, setTargetIndex] = useState(0);
  Fetch(setTxt);

  if (!txt) return "";
  let test = txt[targetIndex].content;
  let queue = txt[targetIndex + 1].content;

  return (
    <div className="flex flex-col justify-center items-center h-200">
      <Window text={test} key={targetIndex} next={setTargetIndex} />
      <Queue text={queue} />
    </div>
  );
}

export default App;
