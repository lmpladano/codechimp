export default function Letter({ txt, status }) {
  const statusColor = {
    pending: "bg-[#63d0ff]",
    incorrect: "bg-[#ff6363]",
    correct: "bg-[#63ff]",
  };

  return <p className={statusColor[status]}>{txt}</p>;
}
