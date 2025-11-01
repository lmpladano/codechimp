import { useEffect } from "react";
export default function Fetch(setTxt) {
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/txt");
      const data = await response.json();
      setTxt(data);
    }
    getData();
  }, []);
}
