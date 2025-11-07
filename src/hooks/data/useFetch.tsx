import { useState, useEffect } from "react";

export default function useFetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3000/txt");
      const data = await response.json();
      setData(data);
    }
    getData();
  }, []);
  return data;
}
