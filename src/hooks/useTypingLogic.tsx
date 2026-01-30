export default function TypingLogic(current, setCurrent, index, setIndex) {
  function countSpaces(): number {
    let count = 1;
    let nextIndex = index + 1;

    while (nextIndex < current.length && current[nextIndex].char === " ") {
      count++;
      nextIndex++;
    }

    return count;
  }
  function handleChange(e) {
    const input = e.key;

    if (input === "Enter") {
      let count = countSpaces();
      setCurrent((prev) => {
        return prev.map((item, i) => {
          if (i >= index && i < index + count) {
            return {
              ...item,
              status: item.char === " " ? "correct" : "incorrect",
            };
          }
          return item;
        });
      });

      setIndex((prevIndex) => prevIndex + count);
    }

    if (input == "Backspace") {
      setIndex((prev) => prev - 1);
      setCurrent((prev) =>
        prev.map((item) =>
          item.index === index - 1 ? { ...item, status: "pending" } : item,
        ),
      );
    }

    if (input.length === 1) {
      setCurrent((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, status: input === item.char ? "correct" : "incorrect" }
            : item,
        ),
      );
      setIndex(index + 1);
    }
  }
  return handleChange;
}
