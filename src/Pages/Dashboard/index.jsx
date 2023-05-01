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
import { format } from "date-fns";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  console.log(tickets);

  useEffect(() => {
    async function loadTickets() {
      const listRef = collection(db, "tickets");
      const q = query(listRef, orderBy("created", "desc"), limit(5));
      setTickets([]);
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
          createdFormat: format(doc.data().created.toDate(), "dd/MM/yyyy"),
          complement: doc.data().complement,
        });
      });
      setTickets((tickets) => [...tickets, ...list]);
    } else {
      setIsEmpty(true);
    }
  }
  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Tickets">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Loading tickets....</span>
          </div>
        </div>
      </div>
    );
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
                {tickets.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="client">{item.client}</td>
                      <td data-label="subjct">{item.subject}</td>
                      <td data-label="status">
                        <span
                          className="badge"
                          style={{ backgroundColor: "#999" }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="register">{item.createdFormat}</td>
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
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
