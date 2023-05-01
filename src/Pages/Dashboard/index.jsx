import { useContext } from "react";
import "./dashboard.css";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>
        <>
          <Link className="new">
            <FiPlus size={25} color="#fff" />
            New call
          </Link>
          <table>
            <thead>
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Register Date</th>
                <th scope="col">#</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="client">Bm</td>
                <td data-label="subjct">Support</td>
                <td data-label="status">
                  <span className="badge" style={{ backgroundColor: "#999" }}>
                    Open
                  </span>
                </td>
                <td data-label="register">01/05/23</td>
                <td data-label="#">
                  <button
                    className="action"
                    style={{ backgroundColor: "#3583f6" }}
                  >
                    <FiSearch color="#fff" size={17} />
                  </button>
                  <button
                    className="action"
                    style={{ backgroundColor: "#f6a935" }}
                  >
                    <FiEdit2 color="#fff" size={17} />
                  </button>
                </td>
              </tr>
              <tr>
                <td data-label="client">Bm</td>
                <td data-label="subjct">Support</td>
                <td data-label="status">
                  <span className="badge" style={{ backgroundColor: "#999" }}>
                    Open
                  </span>
                </td>
                <td data-label="register">01/05/23</td>
                <td data-label="#">
                  <button
                    className="action"
                    style={{ backgroundColor: "#3583f6" }}
                  >
                    <FiSearch color="#fff" size={17} />
                  </button>
                  <button
                    className="action"
                    style={{ backgroundColor: "#f6a935" }}
                  >
                    <FiEdit2 color="#fff" size={17} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
};

export default Dashboard;
