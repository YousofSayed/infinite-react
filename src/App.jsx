import { BrowserRouter, Route, Routes } from "react-router-dom";

import { StyleAside } from "./components/Home/StyleAside";
import { Blocks } from "./components/Home/Blocks";
import { TraitsAside } from "./components/Home/TraitsAside";
import { lazy, Suspense } from "react";
import { Loader } from "./components/Loader";
import { Preview } from "./views/Preview";
import { Commands } from "./components/Home/Commands";

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
              <Route path="commands" element={<Commands />} />
            </Route>
          </Route>

          <Route path="/preview" element={<Preview/>}></Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
