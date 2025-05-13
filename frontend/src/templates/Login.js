import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from "react-router-dom";

function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(form);
            localStorage.setItem("token", response.data.access);
            alert("Login successful!");
            navigate('/home');
        } catch (error) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-75 overflow-hidden">
                
                {/* Left Side - Image */}
                <div className="col-md-6 d-none d-md-block p-0">
                    <img 
                        src="https://www.pngmart.com/files/8/Inventory-PNG-Pic.png" 
                        alt="Login" 
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                name="username"
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                onChange={handleChange}
                                value={form.username}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={handleChange}
                                value={form.password}
                                required
                            />
                        </div>
                        <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#b50318" }}>
                            Login
                        </button>
                        <p className="mt-3 text-center">
                            Don't have an account? <Link to="/register" style={{ color: "#b50318", fontWeight: "bold" }}>Register here</Link>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
