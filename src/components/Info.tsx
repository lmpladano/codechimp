import { useState } from "react";
import Timer from "./Timer";

export default function Info() {
  const [select, setSelect] = useState(10);

  function handleClick(e) {
    setSelect(e.target.value);
    console.log(select);
  }

  return (
    <>
      <div className=" flex flex-row gap-5 text-2xl text-amber-50 m-10 bg-black rounded-2xl p-10">
        <p>choose time:</p>
        <button onClick={handleClick} value={15}>
          15
        </button>
        <button onClick={handleClick} value={30}>
          30
        </button>
        <button onClick={handleClick} value={60}>
          60
        </button>
        <Timer time={select} />
      </div>
    </>
  );
}
