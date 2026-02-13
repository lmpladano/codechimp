import Header from "./components/Header";
import Window from "./components/Window";

function App() {
  return (
    <div className="min-h-screen bg-amber">
      <Header />
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-4 pb-12 pt-8">
        <Window />
      </div>
    </div>
  );
}

export default App;
