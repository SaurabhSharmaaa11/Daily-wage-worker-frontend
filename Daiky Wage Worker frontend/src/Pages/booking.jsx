import { useEffect, useState } from "react";
import API from "../api/api";

function Booking() {

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    try {

      const response = await API.get("/Booking");

      console.log("Bookings:", response.data);

      setBookings(response.data);

    }

    catch (error) {

      console.log("Booking Error:", error);

    }

  };

  useEffect(() => {

    fetchBookings();

  }, []);

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/Booking/${id}`, {

        status

      });

      alert("Status Updated Successfully");

      fetchBookings();

    }

    catch (error) {

      console.log(error);

      alert("Failed to update status");

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Booking Dashboard</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>

        <thead>

          <tr>

            <th>Worker</th>

            <th>Customer</th>

            <th>Phone</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {bookings.length === 0 ? (

            <tr>

              <td colSpan="5">No Bookings Found</td>

            </tr>

          ) : (

            bookings.map((booking) => (

              <tr key={booking._id}>

                <td>{booking.workerName}</td>

                <td>{booking.customerName}</td>

                <td>{booking.customerPhone}</td>

                <td>{booking.status}</td>

                <td>

                  <button
                    onClick={() => updateStatus(booking._id, "Accepted")}
                  >
                    Accept
                  </button>

                  {" "}

                  <button
                    onClick={() => updateStatus(booking._id, "Rejected")}
                  >
                    Reject
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default Booking;