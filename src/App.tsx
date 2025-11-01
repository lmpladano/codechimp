import { useState } from "react";
import Fetch from "./hooks/data/useFetch";
import Window from "./components/Window";

function App() {
  const [txt, setTxt] = useState(null);
  const [targetIndex, setTargetIndex] = useState(0);
  Fetch(setTxt);

  if (!txt) return "";
  let test = txt[targetIndex].content;
  return (
    <div className="flex justify-center items-center h-200">
      <Window text={test} key={targetIndex} next={setTargetIndex} />
    </div>
  );
}

export default App;
