import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import "./WorkerProfile.css";

function WorkerProfile(){

const {id}=useParams();

const [worker,setWorker]=useState(null);


const fetchWorker = async()=>{

const response = await API.get(`/Worker/${id}`);

setWorker(response.data);

};


useEffect(()=>{

fetchWorker();

},[id]);

const hireWorker = async()=>{

const customerName = prompt("Enter Your Name");

const customerPhone = prompt("Enter Your Phone Number");

if(!customerName || !customerPhone){

alert("All fields are required");

return;

}

try{

console.log(worker);

await API.post("/Booking",{

workerId:worker._id,

workerName:worker.name,

customerName,

customerPhone

});

alert("Worker Hired Successfully");

}

catch(error){

console.log(error);

alert("Booking Failed");

}

};

if(!worker){

return <h2>Loading...</h2>

}



return(

<div className="profile-card">

<h2>
👷 {worker.name}
</h2>


<p>
📞 Phone: {worker.phone}
</p>


<p>
🔧 Work: {worker.workType}
</p>


<p>
⭐ Experience: {worker.experience}
</p>


<p>
🟢 Status: {worker.availability}
</p>


<p>
💰 Wage: ₹{worker.wage}/day
</p>


<p>
📍 Address: {worker.address}
</p>


 <a href={`tel:${worker.phone}`}>

<button className="contact-btn">

📞 Contact Worker

</button>

</a>

<a
href={`https://wa.me/91${worker.phone}`}
target="_blank"
>

<button className="whatsapp-btn">

💬 WhatsApp

</button>

</a>

<button
className="hire-btn"
onClick={hireWorker}
>

🤝 Hire Worker

</button>

</div>

)


}


export default WorkerProfile;