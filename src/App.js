import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.css";
import Box from "./components/UI/Box";
import { CurrencyContextProvider } from "./context/currency-context";

function App() {
  return (
    <div className="box">
      <CurrencyContextProvider>
        <Box boxClassStyle="header"><Header /></Box>
        <Outlet />
      </CurrencyContextProvider>
    </div>
  );
}

export default App;
