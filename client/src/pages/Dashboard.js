// pages/Dashboard.js
import { useState } from "react";
import dashboardData from "../data/dashboardData"
// import LevelFilter from "../components/LevelSelector";
import Section from "../components/Section";
// import LevelSelector from "../components/LevelSelector";

function Dashboard() {
  const [level, setLevel] = useState("All");

  return (
    <div className="dashboard">
      <h1>CodeZen Dashboard</h1>

      <LevelFilter setLevel={setLevel} />
      <Section title="DSA Concepts" data={dashboardData.dsa} level={level} />
      <Section title="Coding Problems" data={dashboardData.problems} level={level} />
      <Section title="Patterns" data={dashboardData.patterns} level={level} />
      <Section title="Algorithms" data={dashboardData.algorithms} level={level} />
    </div>
  );
}

export default Dashboard;
