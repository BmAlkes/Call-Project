import { useContext } from "react";
import "./dashboard.css";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <Header />
      Dashboard
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
