import { useState } from "react";
import { register } from "../api"; // Assuming register function is set up
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form); // Register user through API
            alert("User registered successfully");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            alert("Error registering user");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="row w-100" >
                
                {/* Left Side Image */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <img 
                        src="https://www.1e.com/_next/image/?url=https%3A%2F%2Fwebcore.1e.com%2Fwp-content%2Fuploads%2F2024%2F07%2F1E-Inventory-Insights.png&w=3840&q=75" 
                        alt="Register" 
                        className="img-fluid rounded-start w-60 h-100"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                {/* Right Side Form */}
                <div className="col-md-6 p-5 pt-6" style={{marginTop: "7em"}}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                name="username"
                                placeholder="Username"
                                className="form-control"
                                onChange={handleChange}
                                value={form.username}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="form-control"
                                onChange={handleChange}
                                value={form.email}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={handleChange}
                                value={form.password}
                                required
                            />
                        </div>
                        <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#b50318" }}>
                            Register
                        </button>
                        <p className="mt-3 text-center">
                            Don't have an account? <Link to="/login" style={{ color: "#b50318", fontWeight: "bold"  }}>Login here</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Register;
