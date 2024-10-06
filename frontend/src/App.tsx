import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ParticleBackground from "./components/Particles";
import CodeEditor from "./pages/CodeEditor";

function App() {
  return (
    <>
      <ParticleBackground/>  
      <div className="w-screen h-screen bg-gray-600 dark z-10">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/editor" element={<CodeEditor />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
