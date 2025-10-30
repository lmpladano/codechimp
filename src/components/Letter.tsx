export default function Letter({ txt, status }) {
  const statusColor = {
    pending: "bg-[#63d0ff2c]",
    incorrect: "bg-[#ff63632c]",
    correct: "bg-[#63ffb92c]",
  };

  return <p className={statusColor[status]}>{txt}</p>;
}
