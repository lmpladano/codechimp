import Header from "./components/Header";
import Window from "./components/Window";
import Info from "./components/Info";

function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-200 bg-amber">
        <Info />
        <Window />
      </div>
    </div>
  );
}

export default App;
