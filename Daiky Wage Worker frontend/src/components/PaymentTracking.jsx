import { useEffect, useState } from "react";
import API from "../api/api";

function PaymentTracking() {

  const [workers, setWorkers] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [summary, setSummary] = useState(null);
  const [payments, setPayments] = useState([]);

  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDate, setPaymentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    API.get("/Worker")
      .then(response => setWorkers(response.data))
      .catch(() => alert("Could not load workers"));
  }, []);

  const loadWorkerData = (workerId) => {

    if (!workerId) {
      setSummary(null);
      setPayments([]);
      return;
    }

    API.get(`/wages/${workerId}`)
      .then(response => setSummary(response.data))
      .catch(() => alert("Could not load wage summary"));

    API.get(`/payments/worker/${workerId}`)
      .then(response => setPayments(response.data))
      .catch(() => alert("Could not load payment history"));
  };

  useEffect(() => {
    loadWorkerData(selectedWorkerId);
  }, [selectedWorkerId]);

  const handleRecordPayment = async () => {

    if (!selectedWorkerId) {
      alert("Please select a worker first");
      return;
    }

    if (!amountPaid || Number(amountPaid) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    try {

      await API.post("/payments", {
        worker: selectedWorkerId,
        amountPaid: Number(amountPaid),
        paymentDate
      });

      alert("Payment recorded");
      setAmountPaid("");
      loadWorkerData(selectedWorkerId);   // refresh totals + history

    }
    catch (error) {
      const backendMessage = error.response?.data?.message || error.response?.data?.error;
      alert(backendMessage ? `Failed to record payment: ${backendMessage}` : "Failed to record payment: could not reach the server");
    }
  };

  return (
    <div>
      <h1>Payment Tracking</h1>

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

      {summary && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Total Wage Earned: ₹{summary.totalWage}</h2>
          <h2>Total Paid: ₹{summary.totalPaid}</h2>
          <h2>Pending Amount: ₹{summary.pendingAmount}</h2>
        </div>
      )}

      {selectedWorkerId && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Record a New Payment</h3>

          <input
            type="number"
            placeholder="Amount"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />

          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />

          <button onClick={handleRecordPayment}>Record Payment</button>
        </div>
      )}

      {payments.length > 0 && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Payment History</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p._id}>
                  <td>{p.paymentDate}</td>
                  <td>₹{p.amountPaid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentTracking;
