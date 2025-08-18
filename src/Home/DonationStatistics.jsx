import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DonationStatistics = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    setStats([
      { name: "Meals Donated", value: 120 },
      { name: "Food Packages", value: 80 },
      { name: "Charities Helped", value: 50 },
    ]);
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <section className="py-12 bg-base-200 rounded-xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-6">📊 Donation Statistics</h2>
        <div className="flex justify-center lg:">
          <PieChart width={400} height={300}>
            <Pie
              data={stats}
              cx={200}
              cy={150}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {stats.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </section>
  );
};

export default DonationStatistics;