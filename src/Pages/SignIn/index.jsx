import "./signin.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container-center">
      <div className="login">
        <div className="area">
          <img src={logo} alt="logo do sistema" />
        </div>
        <form>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Enter</button>
        </form>
        <Link to="/register"> Create a new account</Link>
      </div>
    </div>
  );
};

export default SignIn;