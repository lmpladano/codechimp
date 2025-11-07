import Header from "./components/Header";
import Window from "./components/Window";

function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-200 bg-amber">
        <Window />
      </div>
    </div>
  );
}

export default App;
