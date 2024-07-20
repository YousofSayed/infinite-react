import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
