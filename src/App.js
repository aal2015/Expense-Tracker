import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Box from "./components/UI/Box";

function App() {
  return (
    <>
      <Box><Header /></Box>
      <Outlet />
    </>
  );
}

export default App;
