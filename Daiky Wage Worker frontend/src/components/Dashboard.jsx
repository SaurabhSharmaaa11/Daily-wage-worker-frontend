import { useEffect, useState } from "react";
import API from "../api/api";
import "../App.css";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/admin/stats")
      .then(response => setStats(response.data))
      .catch(() => alert("Could not load dashboard stats"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!stats) {
    return <p>Could not load stats.</p>;
  }

  return (
    <div className="dashboard">
      <h1>Contractor Dashboard</h1>

      <div className="card-container">

        <div className="card">
          <h2>Total Workers</h2>
          <p>{stats.totalWorkers}</p>
        </div>

        <div className="card">
          <h2>Present Today</h2>
          <p>{stats.presentToday}</p>
        </div>

        <div className="card">
          <h2>Half Day Today</h2>
          <p>{stats.halfDayToday}</p>
        </div>

        <div className="card">
          <h2>Total Wage Due</h2>
          <p>₹{stats.totalWageDue}</p>
        </div>

        <div className="card">
          <h2>Total Paid</h2>
          <p>₹{stats.totalPaid}</p>
        </div>

      </div>

      {stats.workers && stats.workers.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Per-Worker Breakdown</h2>
          <table border="1" cellPadding="8" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Work Type</th>
                <th>Daily Wage</th>
                <th>Present Days</th>
                <th>Half Days</th>
                <th>Total Wage</th>
                <th>Total Paid</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
              {stats.workers.map(w => (
                <tr key={w.workerId}>
                  <td>{w.name}</td>
                  <td>{w.workType}</td>
                  <td>₹{w.dailyWage}</td>
                  <td>{w.presentDays}</td>
                  <td>{w.halfDays}</td>
                  <td>₹{w.totalWage}</td>
                  <td>₹{w.totalPaid}</td>
                  <td>₹{w.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
