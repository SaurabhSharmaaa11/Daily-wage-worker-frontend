import { useEffect, useState } from "react";
import API from "../api/api";
import "./WorkerList.css";
import { Link } from "react-router-dom";


function WorkerList(){

    const [workers,setWorkers] = useState([]);

    const [workFilter,setWorkFilter] = useState("All");

    const [sortWage,setSortWage] = useState("");
    
    const [search,setSearch] = useState("");

    const [editWorker,setEditWorker] = useState(null);


    const fetchWorkers = async()=>{

        const response = await API.get("/workers");

        setWorkers(response.data);

    };


    useEffect(()=>{

        fetchWorkers();

    },[]);



    const deleteWorker = async(id)=>{

        await API.delete(`/workers/${id}`);

        fetchWorkers();

    };



    const updateWorker = async()=>{

        await API.put(
            `/workers/${editWorker._id}`,
            editWorker
        );


        alert("Worker Updated Successfully");

        setEditWorker(null);

        fetchWorkers();

    };



return(

<div>


 <h2>Available Workers</h2>

 <select

value={workFilter}

onChange={(e)=>setWorkFilter(e.target.value)}

>

<option value="All">
All
</option>

<option value="Construction">
Construction
</option>

<option value="Electrician">
Electrician
</option>

<option value="Plumber">
Plumber
</option>

<option value="Labour">
Labour
</option>

<option value="Carpenter">
Carpenter
</option>


</select>

 <input

type="text"

placeholder="Search worker by name or work"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>


<select

value={sortWage}

onChange={(e)=>setSortWage(e.target.value)}

>

<option value="">
Sort Wage
</option>

<option value="low">
Low to High
</option>

<option value="high">
High to Low
</option>

</select>


<div className="worker-container">


{

workers

.filter((worker)=>

(

worker.name.toLowerCase().includes(search.toLowerCase())

||

worker.workType.toLowerCase().includes(search.toLowerCase())

)

&&

(

workFilter==="All"

||

worker.workType===workFilter

)

)

.sort((a,b)=>{

if(sortWage==="low"){

return a.wage-b.wage;

}


if(sortWage==="high"){

return b.wage-a.wage;

}


return 0;

})

.map((worker)=>(
 

 <div 
className="worker-card" 
key={worker._id}
>


<div className="worker-icon">
👷
</div>


<h3>
{worker.name}
</h3>


<p>
🔧 {worker.workType}
</p>


<p>
⭐ Experience: {worker.experience} years
</p>


<p className="status">

🟢 {worker.availability}

</p>


<p>
💰 ₹{worker.wage}/day
</p>


<p>
📍 {worker.address}
</p>



<Link to={`/worker/${worker._id}`}>

<button className="profile-btn">

View Profile

</button>

</Link>



<button
className="edit-btn"
onClick={()=>setEditWorker(worker)}
>

Edit

</button>



<button

className="delete-btn"

onClick={()=>deleteWorker(worker._id)}

>

Delete

</button>


</div>

))

}


</div>




{

editWorker && (

<div>


<h2>Edit Worker</h2>


<input

value={editWorker.name}

onChange={(e)=>

setEditWorker({

...editWorker,

name:e.target.value

})

}

/>



<input

value={editWorker.workType}

onChange={(e)=>

setEditWorker({

...editWorker,

workType:e.target.value

})

}

/>



<input

value={editWorker.wage}

onChange={(e)=>

setEditWorker({

...editWorker,

wage:e.target.value

})

}

/>



<input

value={editWorker.address}

onChange={(e)=>

setEditWorker({

...editWorker,

address:e.target.value

})

}

/>



<button
onClick={updateWorker}
>
Update Worker
</button>


</div>

)


}



</div>

)

}


export default WorkerList; 

 
