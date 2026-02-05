import logo from '../../assets/logo.png';
import loginImage from '../../assets/login_img.png';
import './styles.css';

const Login = () => {
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
                    <input type="email" placeholder="Enter E-Mail" className="login-input" />
                    <input type="password" placeholder="Password" className="login-input" />

                    <div className="login-options">
                        <a href="#" className="forgot-password">Forgotten Password?</a>
                    </div>

                    <div className="divider">
                        <span>Or Continue With</span>
                    </div>

                    <div className="social-login">
                        <button className="social-button google">Google</button>
                        <button className="social-button apple">Apple</button>
                    </div>

                    <button className="login-button">Login</button>

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