import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContentBased from "./pages/ContentBased";
import RuleBased from "./pages/RuleBased";
import LocationBased from "./pages/LocationBased";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/content" element={<ContentBased />} />
      <Route path="/rule" element={<RuleBased />} />
      <Route path="/location" element={<LocationBased />} />
    </Routes>
  );
}
