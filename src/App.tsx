import React from "react";
import { MultiSelect } from "./components";
import "./styles/reset.scss";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">Lobox</header>
      <main className="main-section">
        <MultiSelect />
      </main>
    </div>
  );
}

export default App;
