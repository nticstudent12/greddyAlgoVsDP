import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";

import KnapsackDashboard from "./KnapsackDashboard";
import RandomizedGreedyDashboard from "./glutonne";

function App() {
  return (
    <BrowserRouter>
      {/* Simple Navigation Bar */}
      <nav className=" text-black px-6 py-3 flex justify-between">
        <h1 className="font-bold">🎒 Knapsack Visualizer</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Knapsack Dashboard
          </Link>
          <Link to="/gloutonne" className="hover:underline">
            Glouton Randomisé
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<KnapsackDashboard />} />
        <Route path="/gloutonne" element={<RandomizedGreedyDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
