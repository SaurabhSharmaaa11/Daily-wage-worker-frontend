import {useEffect,useState} from "react";
import axios from "axios";
import {useParams,useNavigate} from "react-router-dom";


function EditWorker(){


const {id}=useParams();

const navigate=useNavigate();


const [worker,setWorker]=useState({});




// GET SINGLE WORKER

useEffect(()=>{


axios.get(

`https://daily-wage-labour-backend.onrender.com/api/Worker/${id}`

)


.then((response)=>{


setWorker(response.data);


})


.catch((error)=>{


console.log(error);


});


},[id]);





const handleChange=(e)=>{


setWorker({

...worker,

[e.target.name]:e.target.value


});


};





const updateWorker=(e)=>{


e.preventDefault();



axios.put(

`https://daily-wage-labour-backend.onrender.com/api/Worker/${id}`,

worker

)


.then(()=>{


alert("Worker Updated Successfully");


navigate("/Worker");


})


.catch((error)=>{


console.log(error);


});


};






return(


<div>


<h1>Edit Worker</h1>



<form onSubmit={updateWorker}>


<input

name="name"

value={worker.name || ""}

onChange={handleChange}

/>



<input

name="phone"

value={worker.phone || ""}

onChange={handleChange}

/>




<input

name="workType"

value={worker.workType || ""}

onChange={handleChange}

/>




<input

name="experience"

value={worker.experience || ""}

onChange={handleChange}

/>




<input

name="wage"

value={worker.wage || ""}

onChange={handleChange}

/>




<input

name="address"

value={worker.address || ""}

onChange={handleChange}

/>



<button>

Update Worker

</button>



</form>



</div>


)


}



export default EditWorker;