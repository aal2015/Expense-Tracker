import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Box from "./components/UI/Box";

function App() {
  return (
    <div className="box">
      <Box boxClassStyle="header"><Header /></Box>
      <Outlet />
    </div>
  );
}

export default App;
