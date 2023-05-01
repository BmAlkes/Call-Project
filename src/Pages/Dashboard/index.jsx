import "./dashboard.css";

import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../config/dbfirebase";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    async function loadTickets() {
      const listRef = collection(db, "tickets");
      const q = query(listRef, orderBy("created", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      await updatedState(querySnapshot);
      setLoading(false);
    }

    loadTickets();
    return () => {};
  }, []);

  async function updatedState(querySnapshot) {
    const isCollectionEmpety = querySnapshot.size === 0;

    if (!isCollectionEmpety) {
      let list = [];
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          client: doc.data().client,
          clientId: doc.data().clientId,
          created: doc.data().created,
          status: doc.data().status,
          complement: doc.data().complement,
        });
      });
      setTickets((tickets) => [...tickets, list]);
    } else {
      setIsEmpty(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        {tickets.length === 0 ? (
          <div className="container dashboard">
            <span>Dont Have tickets</span>
            <Link className="new" to="/new">
              <FiPlus size={25} color="#fff" />
              New call
            </Link>
          </div>
        ) : (
          <>
            <Link className="new" to="/new">
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
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
