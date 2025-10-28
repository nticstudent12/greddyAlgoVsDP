import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// === 30 results from your randomized greedy algorithm ===
const runs: number[] = [
  1620, 1546, 1518, 1401, 1444, 1620, 1378, 1568, 1343, 1467, 1407, 1395, 1407,
  1366, 1561, 1450, 1520, 1608, 1529, 1620, 1620, 1454, 1390, 1530, 1585, 1456,
  1547, 1362, 1620, 1620,
];

// === Compute stats ===
const mean: number = runs.reduce((a, b) => a + b, 0) / runs.length;
const variance: number =
  runs.map((x) => (x - mean) ** 2).reduce((a, b) => a + b, 0) / runs.length;
const std: number = Math.sqrt(variance);
const max: number = Math.max(...runs);
const min: number = Math.min(...runs);

// === Prepare data for chart ===
const chartData: { run: number; value: number }[] = runs.map((v, i) => ({
  run: i + 1,
  value: v,
}));

export default function RandomizedGreedyDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white py-6 shadow text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          🎲 Randomized Greedy (Glouton Randomisé) – Knapsack
        </h1>
        <p className="text-gray-600 mt-2">
          Visualization of 30 executions – showing variability and performance.
        </p>
      </header>

      {/* Stats Summary */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 w-full bg-gray-50">
        <Stat label="Mean" value={mean.toFixed(2)} color="text-blue-600" />
        <Stat label="Std Dev" value={std.toFixed(2)} color="text-purple-600" />
        <Stat label="Max" value={max} color="text-green-600" />
        <Stat label="Min" value={min} color="text-red-600" />
      </section>

      {/* Chart */}
      <section className="bg-white w-screen rounded-none shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          📈 Total Value per Execution
        </h2>
        <div className="w-full h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="run"
                label={{ value: "Execution", position: "insideBottomRight" }}
              />
              <YAxis
                label={{
                  value: "Total Value",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Footer Explanation */}
      <footer className="bg-gray-50 text-gray-700 text-sm px-8 py-8 mt-6 leading-relaxed">
        <h3 className="text-lg font-semibold text-blue-700 mb-3 text-center">
          📊 Interpretation of Results
        </h3>
        <div className="max-w-4xl mx-auto space-y-2">
          <p>
            • <strong>Mean (1498.40)</strong> — represents the{" "}
            <em>average total value</em> obtained across 30 runs. It reflects
            the typical performance of the randomized greedy approach.
          </p>
          <p>
            • <strong>Standard Deviation (92.71)</strong> — indicates the
            <em>variability</em> of the algorithm. A moderate deviation means
            the solution is mostly stable but still influenced by random
            selection.
          </p>
          <p>
            • <strong>Maximum (1620)</strong> — is the <em>best-case</em>{" "}
            result, showing the maximum value the algorithm achieved when it
            picked highly efficient items.
          </p>
          <p>
            • <strong>Minimum (1343)</strong> — is the <em>worst-case</em>
            result, obtained in less favorable random draws.
          </p>
          <p>
            💡 Overall, the randomized greedy algorithm achieves a strong
            average performance near the optimal value (1620), demonstrating a
            balance between <strong>exploration</strong> (randomness) and
            <strong> exploitation</strong> (greedy selection of best ratios).
          </p>
        </div>
      </footer>
    </div>
  );
}

// Reusable stat component
function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <h2 className="text-gray-500 text-sm">{label}</h2>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
}
