import "./App.css";
import SelectableGrid from "./components/selectable-grid";

function App() {
  return (
    <main>
      <h1>Selectable Grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </main>
  );
}

export default App;
