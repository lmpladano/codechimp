import Window from "./components/Window";

function App() {
  let test = `async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
fetchData('https://api.example.com/data');`;
  return (
    <div className="flex justify-center items-center h-200">
      <Window text={test} />
    </div>
  );
}

export default App;
