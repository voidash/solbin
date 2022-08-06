import Navbar from "./components/Navbar";
import Maps from "./components/Maps";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="navmuni"></div>
      <Maps className="map" />
    </>
  );
}

export default App;
