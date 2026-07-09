import { useState } from "react";
import API from "../api/api";

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    if (!name || !email || !password || !confirmPassword) {

      alert("Please fill all fields");

      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      const response = await API.post("/auth/register", {

        name,
        email,
        password,
        role: "customer"

      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    }

    catch (error) {

      if (error.response) {

        alert(error.response.data.message);

      }

      else {

        alert("Something went wrong");

      }

    }

  };

  return (

    <div>

      <h1>Register Page</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>

        Register

      </button>

    </div>

  );

}

export default SignUp;