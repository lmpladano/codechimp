import { useState, useEffect } from "react";
export default function Fetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/txt");
      const data = await response.json();
      setData(
        data[0].content.split("").map((letter: string, i: number) => {
          return { char: letter, status: "pending", index: i };
        })
      );
    }
    getData();
  }, []);
  return data;
}
