import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { ElementsAside } from "./components/Home/ElementsAside";
import { StyleAside } from "./components/Home/StyleAside";
import { Blocks } from "./components/Home/Blocks";
import { TraitsAside } from "./components/Home/TraitsAside";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Blocks />} />
          <Route path="/edite" >
            <Route path="styling" element={<StyleAside />} />
            <Route path="traits" element={<TraitsAside />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
