import { useEffect, useState } from "react";
import API from "../api/api";

function WageCalculation() {

  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/Worker")
      .then(response => setWorkers(response.data))
      .catch(() => alert("Could not load workers"));
  }, []);

  useEffect(() => {

    if (!selectedWorkerId) {
      setSummary(null);
      return;
    }

    setLoading(true);

    API.get(`/wages/${selectedWorkerId}`)
      .then(response => setSummary(response.data))
      .catch(() => alert("Could not load wage summary"))
      .finally(() => setLoading(false));

  }, [selectedWorkerId]);

  return (
    <div>
      <h1>Wage Calculation</h1>

      <label>
        Select Worker:{" "}
        <select
          value={selectedWorkerId}
          onChange={(e) => setSelectedWorkerId(e.target.value)}
        >
          <option value="">-- Choose a worker --</option>
          {workers.map(w => (
            <option key={w._id} value={w._id}>{w.name}</option>
          ))}
        </select>
      </label>

      {loading && <p>Calculating...</p>}

      {summary && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Daily Wage: ₹{summary.dailyWage}</h2>
          <h2>Present Days: {summary.presentDays}</h2>
          <h2>Half Days: {summary.halfDays}</h2>
          <h2>Absent Days: {summary.absentDays}</h2>
          <h2>Total Wage Earned: ₹{summary.totalWage}</h2>
          <h2>Total Paid So Far: ₹{summary.totalPaid}</h2>
          <h2>Pending Amount: ₹{summary.pendingAmount}</h2>
        </div>
      )}
    </div>
  );
}

export default WageCalculation;
