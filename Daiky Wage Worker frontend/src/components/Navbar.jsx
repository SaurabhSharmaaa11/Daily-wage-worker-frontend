import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";


function Navbar(){

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status whenever the Navbar renders (e.g. after navigating to a new page)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    alert("Logged out");
    navigate("/login");
  };

return(

<nav className="navbar">


<h2>
👷 Daily Wage Labour Platform
</h2>


<div className="nav-links">


<Link to="/">
Home
</Link>


<Link to="/register">
Register Worker
</Link>


<Link to="/worker">
Find Worker
</Link>

<Link to="/signup">
Sign Up
</Link>

<Link to="/attendance">
Attendance
</Link>

<Link to="/wages">
Wages
</Link>

<Link to="/payments">
Payments
</Link>

<Link to="/dashboard">
Dashboard
</Link>

{isLoggedIn ? (
  <button onClick={handleLogout} className="nav-logout-btn">
    Logout
  </button>
) : (
  <Link to="/login">
  Login
  </Link>
)}

<Link to="/signup" className="nav-cta">
Get Started
</Link>

</div>


</nav>

)

}


export default Navbar;
