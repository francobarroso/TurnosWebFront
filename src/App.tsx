import { AppRoutes } from "./routes/AppRoutes"
import './App.css';
import SideBar from "./components/common/SideBar";
import TopBar from "./components/common/TopBar";

function App() {

  return (
    <>
      <TopBar />
      <div className="flex">
        <SideBar />
        <div className="content">
          <AppRoutes />
        </div>
      </div>
    </>
  )
}

export default App
