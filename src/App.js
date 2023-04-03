import { Navbar } from "./components/navBar";
import './App.css';
import { SideBar } from "./components/SideBar";
import { GraphArea } from "./components/GraphArea";
import { DataTable } from "./components/DataTable";


function App() {


  return (
    <div>
      <Navbar/>
      <div className="panel">
        <SideBar/>

        <GraphArea/>

        <DataTable/>
      </div>
    </div>
  );
}

export default App;
