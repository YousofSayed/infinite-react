import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StyleAside } from "./components/Home/StyleAside";
import { Blocks } from "./components/Home/Blocks";
import { TraitsAside } from "./components/Home/TraitsAside";
import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader";

function App() {
  const Home = lazy(async () =>({
    default: (await import("./views/Home")).Home
  }) );
  
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Blocks />} />
            <Route path="/edite">
              <Route path="styling" element={<StyleAside />} />
              <Route path="traits" element={<TraitsAside />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
