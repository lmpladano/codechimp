import Letter from "./Letter";

export default function Queue({ text }) {
  const queue = text.split("").map((letter: string, i: number) => {
    return { char: letter, status: "pending", index: i };
  });
  const word = queue.map((item) => (
    <Letter status={item.status} index={item.index} txt={item.char} />
  ));
  return (
    <>
      <div className="flex flex-row flex-wrap items-start w-180 bg-[#1a1a1a] ">
        {word}
      </div>
    </>
  );
}
