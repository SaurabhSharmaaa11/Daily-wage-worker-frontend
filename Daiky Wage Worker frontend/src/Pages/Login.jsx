import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {

            toast.error("Please fill all fields");
            return;

        }

        try {

            const response = await API.post("/auth/login", {

                email,
                password

            });

            // Save Token
            localStorage.setItem("token", response.data.token);

            // Save User
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            toast.success("Login Successful");

            navigate("/");

        }

        catch (error) {

            if (error.response) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Server Error");

            }

        }

    };

    return (

        <div className="worker-form">

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;