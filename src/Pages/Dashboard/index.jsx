import { useContext } from "react";
import "./dashboard.css";
import { AuthContext } from "../../context/auth";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      Dashboard
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
