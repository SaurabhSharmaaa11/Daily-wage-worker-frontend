import { useState } from "react";
import axios from "axios";


function AddWorker(){


const [worker,setWorker] = useState({

name:"",
phone:"",
workType:"",
experience:"",
availability:"Available",
wage:"",
address:""

});



const handleChange=(e)=>{


setWorker({

...worker,

[e.target.name]:e.target.value

});


}




const handleSubmit=(e)=>{

e.preventDefault();



axios.post(
"https://daily-wage-labour-backend.onrender.com/api/Worker",
worker
)

.then((res)=>{


console.log(res.data);


alert("Worker Added Successfully");


})

 .catch((error)=>{

console.log("FULL ERROR:", error.response?.data);

alert(error.response?.data?.error || "Error Adding Worker");

});

}




return(


<div>


<h1>Add Worker</h1>


<form onSubmit={handleSubmit}>


<input
name="name"
placeholder="Worker Name"
onChange={handleChange}
/>


<input
name="phone"
placeholder="Phone Number"
onChange={handleChange}
/>



<input
name="workType"
placeholder="Work Type"
onChange={handleChange}
/>



<input
name="experience"
placeholder="Experience"
onChange={handleChange}
/>



<input
name="wage"
placeholder="Daily Wage"
onChange={handleChange}
/>



<input
name="address"
placeholder="Address"
onChange={handleChange}
/>



<button type="submit">

Add Worker

</button>


</form>


</div>


)


}


export default AddWorker;