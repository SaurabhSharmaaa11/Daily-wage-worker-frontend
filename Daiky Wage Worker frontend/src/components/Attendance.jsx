import { useEffect, useState } from "react";
import API from "../api/api";

function Attendance() {

  const [workers, setWorkers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]   // defaults to today, e.g. "2026-07-06"
  );
  const [statusMap, setStatusMap] = useState({});   // { workerId: "Present" }
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    try {
      const response = await API.get("/Worker");
      setWorkers(response.data);
    }
    catch (error) {
      alert("Could not load workers. Is the backend running?");
    }
    finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (workerId, status) => {
    setStatusMap(prev => ({ ...prev, [workerId]: status }));
  };

  const handleSave = async (workerId) => {

    const status = statusMap[workerId];

    if (!status) {
      alert("Please choose a status first");
      return;
    }

    setSavingId(workerId);

    try {
      await API.post("/attendance", {
        worker: workerId,
        date: selectedDate,
        status
      });

      alert("Attendance saved");
    }
    catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      alert(backendMessage ? `Failed to save attendance: ${backendMessage}` : "Failed to save attendance: could not reach the server");
    }
    finally {
      setSavingId(null);
    }
  };

  if (loading) {
    return <p>Loading workers...</p>;
  }

  return (
    <div>
      <h1>Attendance Management</h1>

      <label>
        Date:{" "}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <table border="1" cellPadding="8" style={{ marginTop: "1rem", width: "100%" }}>
        <thead>
          <tr>
            <th>Worker Name</th>
            <th>Work Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {workers.length === 0 && (
            <tr>
              <td colSpan="4">No workers found. Add workers first.</td>
            </tr>
          )}

          {workers.map((worker) => (
            <tr key={worker._id}>
              <td>{worker.name}</td>
              <td>{worker.workType}</td>
              <td>
                <select
                  value={statusMap[worker._id] || ""}
                  onChange={(e) => handleStatusChange(worker._id, e.target.value)}
                >
                  <option value="" disabled>Select</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Half Day">Half Day</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleSave(worker._id)}
                  disabled={savingId === worker._id}
                >
                  {savingId === worker._id ? "Saving..." : "Save"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
