import { useEffect, useState } from "react";
import axios from "axios";
import "./Worker.css";
import { useNavigate } from "react-router-dom";

function Worker(){


const [workers,setWorkers] = useState([]);

const [search,setSearch] = useState("");

const [filter,setFilter] = useState("");

const navigate = useNavigate();


// GET ALL WORKERS

useEffect(()=>{


axios.get(
"https://daily-wage-labour-backend.onrender.com/api/Worker"
)

.then((response)=>{


setWorkers(response.data);


})

.catch((error)=>{


console.log(error);


});


},[]);






// SEARCH + FILTER

const filteredWorkers = workers.filter((worker)=>{


return (

worker.name
.toLowerCase()
.includes(search.toLowerCase())

&&

worker.workType
.toLowerCase()
.includes(filter.toLowerCase())


);


});







// DELETE WORKER

const deleteWorker = (id)=>{


axios.delete(

`https://daily-wage-labour-backend.onrender.com/api/Worker/${id}`

)


.then(()=>{


alert("Worker Deleted Successfully");



setWorkers(

workers.filter(

(worker)=>worker._id !== id

)

);


})


.catch((error)=>{


console.log(error);


});


};







// EDIT WORKER

const editWorker = (id)=>{


window.location.href = `/edit-worker/${id}`;


};








return(


<div className="worker-container">



<h1>Available Workers</h1>





<input


type="text"


placeholder="Search worker name"


value={search}


onChange={(e)=>setSearch(e.target.value)}


/>





<input


type="text"


placeholder="Search work type"


value={filter}


onChange={(e)=>setFilter(e.target.value)}


/>








<div className="worker-grid">





{

filteredWorkers.map((worker)=>(



 <div
className="worker-card"
key={worker._id}
onClick={() => navigate(`/Worker/${worker._id}`)}
style={{ cursor: "pointer" }}
>





<h2>

{worker.name}

</h2>





<p>

<b>Work:</b> {worker.workType}

</p>





<p>

<b>Phone:</b> {worker.phone}

</p>





<p>

<b>Experience:</b> {worker.experience}

</p>





<p>

<b>Wage:</b> ₹{worker.wage}

</p>





<p>

<b>Address:</b> {worker.address}

</p>





<h4>

{worker.availability}

</h4>

 <button
onClick={(e)=>{
e.stopPropagation();
editWorker(worker._id);
}}
>
Edit
</button>

<button
onClick={(e)=>{
e.stopPropagation();
deleteWorker(worker._id);
}}
>
Delete
</button>

</div>


))


}

</div>

</div>


)


}



export default Worker;