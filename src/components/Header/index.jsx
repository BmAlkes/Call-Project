import "./header.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiLogOut, FiSettings } from "react-icons/fi";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="sidebar">
      <div className="avatar">
        <img
          src={user.avatarUrl === null ? avatar : user.avatarUrl}
          alt="user picture"
        />
      </div>
      <div className="menu">
        <Link to="/dashboard">
          <FiHome color="#fff" size={24} />
          Home
        </Link>
        <Link to="/customer">
          <FiUser color="#fff" size={24} />
          Clients
        </Link>
        <Link to="/profile">
          <FiSettings color="#fff" size={24} />
          Profile
        </Link>
        <button onClick={handleLogout} className="button">
          <FiLogOut color="#fff" size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
