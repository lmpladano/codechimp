import { useEffect, useState } from "react";
import Window from "./components/Window";

function App() {
  const [txt, setTxt] = useState(null);
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/txt");
      const data = await response.json();
      setTxt(data);
    }
    getData();
  }, []);
  if (!txt) return "";
  const test = txt[0].content;
  return (
    <div className="flex justify-center items-center h-200">
      <Window text={test} />
    </div>
  );
}

export default App;
