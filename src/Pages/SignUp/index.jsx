import "./signup.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
        <Link to="/"> Have already a account</Link>
      </div>
    </div>
  );
};

export default SignUp;
