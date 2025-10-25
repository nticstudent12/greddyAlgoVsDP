import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = {
  "knapsack_test50.txt": [
    { method: "Greedy (value)", value: 1269, weight: 348, items: 14 },
    { method: "Greedy (weight)", value: 1468, weight: 346, items: 22 },
    { method: "Greedy (ratio)", value: 1620, weight: 346, items: 21 },
    { method: "Dynamic (Optimal)", value: 1622, weight: 348, items: 21 },
  ],
  "knapsack_test100.txt": [
    { method: "Greedy (value)", value: 2442, weight: 634, items: 31 },
    { method: "Greedy (weight)", value: 2514, weight: 633, items: 48 },
    { method: "Greedy (ratio)", value: 2806, weight: 631, items: 43 },
    { method: "Dynamic (Optimal)", value: 2820, weight: 636, items: 42 },
  ],
  "knapsack_test1000.txt": [
    { method: "Greedy (value)", value: 23140, weight: 6853, items: 262 },
    { method: "Greedy (weight)", value: 25488, weight: 6832, items: 459 },
    { method: "Greedy (ratio)", value: 28970, weight: 6854, items: 404 },
    { method: "Dynamic (Optimal)", value: 28974, weight: 6856, items: 403 },
  ],
};

export default function KnapsackDashboard() {
  const [hoverInfo, setHoverInfo] = useState<{
    file: string;
    method: string;
  } | null>(null);
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 space-y-8 relative">
      {/* Floating Hover Info */}
      {hoverInfo && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs sm:text-sm px-4 py-2 rounded-full shadow-lg animate-fadeIn z-50">
          📁 {hoverInfo.file} — ⚙️ {hoverInfo.method}
        </div>
      )}

      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 flex justify-center items-center gap-2">
          📊 Knapsack Algorithm Comparison Dashboard
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Visualization of Greedy vs Dynamic Programming results across
          datasets.
        </p>
      </header>

      {/* Chart Grid */}
      <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(data).map(([filename, results]) => {
          const best = results.reduce((max, r) =>
            r.value > max.value ? r : max
          );

          return (
            <section
              key={filename}
              className="bg-white rounded-2xl shadow-md p-4 border border-gray-200 transition-transform hover:scale-[1.02] flex flex-col">
              {/* Dataset Info */}
              <div className="mb-2 text-center text-sm sm:text-base text-gray-700">
                <p className="font-semibold text-blue-700 break-words">
                  📄 {filename.replace(".txt", "")}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs sm:text-sm text-gray-600">
                  <span>🧮 Methods: {results.length}</span>
                  <span>💎 Best Value: {best.value}</span>
                  <span>⚙️ Optimal: {best.method}</span>
                </div>
              </div>

              {/* Chart */}
              <div className="h-56 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={results}
                    onMouseMove={(state) => {
                      if (state && state.activeLabel) {
                        setHoverInfo({
                          file: filename,
                          method: state.activeLabel,
                        });
                        setHoveredMethod(state.activeLabel);
                      }
                    }}
                    onMouseLeave={() => {
                      setHoverInfo(null);
                      setHoveredMethod(null);
                    }}>
                    <XAxis
                      dataKey="method"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 10 }} />

                    <Bar
                      dataKey="value"
                      name="Total Value"
                      fill="#3b82f6"
                      radius={[6, 6, 0, 0]}
                      fillOpacity={1}
                      style={{
                        opacity:
                          hoveredMethod && hoveredMethod !== "value" ? 0.8 : 1,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    />

                    <Bar
                      dataKey="weight"
                      name="Total Weight"
                      fill="#14b8a6"
                      radius={[6, 6, 0, 0]}
                      fillOpacity={1}
                      style={{
                        opacity:
                          hoveredMethod && hoveredMethod !== "weight" ? 0.8 : 1,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    />

                    <Bar
                      dataKey="items"
                      name="Items Chosen"
                      fill="#f59e0b"
                      radius={[6, 6, 0, 0]}
                      fillOpacity={1}
                      style={{
                        opacity:
                          hoveredMethod && hoveredMethod !== "items" ? 0.8 : 1,
                        transition: "opacity 0.2s ease-in-out",
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Footer Text */}
              <p className="text-center text-xs sm:text-sm text-gray-600 mt-3">
                Comparison between Greedy (3 factors) and Dynamic (Optimal)
              </p>
            </section>
          );
        })}
      </main>

      {/* Report Section */}
      <footer className="bg-white rounded-2xl shadow-md p-4 sm:p-6 border border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          🧠 Algorithm Analysis Report
        </h2>
        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
          The <strong>Dynamic Programming (DP)</strong> algorithm consistently
          achieves the highest total value, labeled as <strong>Optimal</strong>.
          The <strong>Greedy (ratio)</strong> algorithm is faster but slightly
          less precise. Use <strong>DP</strong> when accuracy is critical, and{" "}
          <strong>Greedy</strong> when computational time is a concern.
        </p>
      </footer>
    </div>
  );
}
