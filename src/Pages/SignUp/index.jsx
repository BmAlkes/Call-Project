import "./signup.css";
import logo from "../../assets/logo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name !== "" && password !== "" && email !== "") {
      await signUp(email, password, name);
      toast.success("Register success");
      navigate("/dashboard");
    } else {
      toast.error("Please fill the files");
    }
  };

  return (
    <div className="container-center">
      <div className="login">
        <div className="area">
          <img src={logo} alt="logo do sistema" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
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
          <button type="submit">
            {loadingAuth ? "Loading..." : "Register "}
          </button>
        </form>
        <Link to="/"> Have already a account?</Link>
      </div>
    </div>
  );
};

export default SignUp;
