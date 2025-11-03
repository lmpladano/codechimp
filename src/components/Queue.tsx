import Letter from "./Letter";

export default function Queue({ txt }) {
  const words = txt.map((item) => (
    <Letter key={item.index} status={item.status} char={item.char} />
  ));

  return <>{words}</>;
}
