import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import AddWorkerListing from "./Pages/AddWorkerListing";
import SignUp from "./Pages/SignUp";
import Worker from "./Pages/Worker";
import WorkerProfile from "./components/WorkerProfile";

import AddWorker from "./Pages/AddWorker";
import EditWorker from "./Pages/EditWorker";
import Booking from "./Pages/Booking";
import Login from "./Pages/Login";
import Attendance from "./components/Attendance";
import WageCalculation from "./components/Wagecalculation";
import PaymentTracking from "./components/PaymentTracking";
import Dashboard from "./components/Dashboard";

function App(){


return(


<div>


<Navbar/>


<hr/>


<Routes>


<Route

path="/"

element={<Home/>}

/>



<Route

path="/Register"

element={<AddWorkerListing/>}

/>



<Route

path="/signup"

element={<SignUp/>}

/>




<Route

path="/Worker"

element={<Worker/>}

/>



<Route

path="/Worker/:id"

element={<WorkerProfile/>}

/>




<Route

path="/add-worker"

element={<AddWorker/>}

/>



<Route

path="/edit-worker/:id"

element={<EditWorker/>}

/>

<Route

path="/booking"

element={<Booking/>}

/>

<Route

path="/login"

element={<Login/>}

/>

<Route

path="/attendance"

element={<Attendance/>}

/>

<Route

path="/wages"

element={<WageCalculation/>}

/>

<Route

path="/payments"

element={<PaymentTracking/>}

/>

<Route

path="/dashboard"

element={<Dashboard/>}

/>

</Routes>


</div>


)

}


export default App;