import { useState, useEffect } from "react";

type Snippet = {
  id?: number;
  content: string;
  difficulty: "easy" | "medium" | "hard";
  lang: string;
};

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export default function useFetch(language: string) {
  const [data, setData] = useState<Snippet[]>([]);

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${API_BASE}/txt?lang=${encodeURIComponent(language)}`,
      );
      const snippets = (await response.json()) as Snippet[];
      setData(snippets);
    }

    getData();
  }, [language]);

  return data;
}
