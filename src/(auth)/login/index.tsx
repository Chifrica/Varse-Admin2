import logo from '../../assets/logo.png';
import loginImage from '../../assets/login_img.png';
import './styles.css';
import { faGoogle, faApple } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // simple admin gate
        if (email === "admin" && password === "admin") {
            navigate("/dashboard", { replace: true });
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-page">
            {/* LEFT */}
            <div className="login-container">
                <img src={logo} alt="Varse Logo" className="login-logo" />

                <div className="login-header">
                    <h1 className="login-title">Sign In</h1>
                    <p className="login-subtitle">
                        Sign in to manage users, vendors, orders, and revenue
                    </p>
                </div>

                <form className="login-form">
                    <input
                        type="email"
                        placeholder="E-Mail"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="login-options">
                        <a href="#" className="forgot-password">Forgotten Password?</a>
                    </div>

                    <div className="divider">
                        <span>Or Continue With</span>
                    </div>

                    <div className="social-login">
                        <button className="social-button google" style={{ color: '#000000', fontSize: '16px' }}>
                            <FontAwesomeIcon
                                icon={faGoogle}
                                style={{ marginRight: '8px', color: '#DB4437' }}
                                size='xl'
                            />
                            Google
                        </button>

                        <button className="social-button apple" style={{ color: '#000000', fontSize: '16px' }}>
                            <FontAwesomeIcon
                                icon={faApple}
                                style={{ marginRight: '8px', color: '#000000' }}
                                size="xl"
                            />
                            Apple
                        </button>
                    </div>

                    {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}


                    <button type="submit" className="login-button" onClick={handleLogin}>Login</button>

                    <p className="signup-text">
                        Don&apos;t Have an account? <span className="signup-link">Sign Up</span>
                    </p>
                </form>
            </div>

            {/* RIGHT */}
            <div className="login-image-container">
                <div className="login-image-container2">
                    <div className="image-overlay">
                        <h3>Changing Campus <br /> Commerce</h3>
                    </div>
                    <img src={loginImage} alt="Delivery" />
                </div>
            </div>
        </div>

    )
}

export default Login;