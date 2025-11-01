import { useState } from "react";
import Fetch from "./hooks/data/useFetch";
import Window from "./components/Window";

function App() {
  const [txt, setTxt] = useState(null);
  Fetch(setTxt);

  if (!txt) return "";
  const test = txt[0].content;
  return (
    <div className="flex justify-center items-center h-200">
      <Window text={test} />
    </div>
  );
}

export default App;
