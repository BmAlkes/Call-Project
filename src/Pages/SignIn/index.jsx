import "./signin.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      signIn(email, password);
      toast.success("Sucess Logged");
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="area">
          <img src={logo} alt="logo do sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            type="email"
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
