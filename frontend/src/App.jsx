import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProblemList from "./pages/ProblemList";
import ProblemDetail from "./pages/ProblemDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProblemList />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;