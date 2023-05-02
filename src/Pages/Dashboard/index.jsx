import "./dashboard.css";

import Header from "../../components/Header";
import Title from "../../components/Title";
import {
  FiDelete,
  FiEdit2,
  FiMessageSquare,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "../../config/dbfirebase";
import { format } from "date-fns";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(() => {
    loadTickets();
    return () => {};
  }, []);
  async function loadTickets() {
    const listRef = collection(db, "tickets");
    const q = query(listRef, orderBy("created", "desc"), limit(5));
    setTickets([]);
    const querySnapshot = await getDocs(q);
    await updatedState(querySnapshot);
    setLoading(false);
  }

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
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setTickets((tickets) => [...tickets, ...list]);
      setLastDocs(lastDoc);
    } else {
      setIsEmpty(true);
    }
    setLoadingMore(false);
  }

  const handleMore = async () => {
    setLoadingMore(true);

    const listRef = collection(db, "tickets");
    const q = query(
      listRef,
      orderBy("created", "desc"),
      startAfter(lastDocs),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    await updatedState(querySnapshot);
    setLoading(false);
  };

  async function handleDeleteCall(id) {
    try {
      await deleteDoc(doc(db, "tickets", id));
      toast.success("Call deleted");
      loadTickets();
    } catch (err) {
      toast.error(err);
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

  function toggleModal(item) {
    setShowModal(!showModal);
    setDetail(item);
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
                          style={{
                            backgroundColor:
                              item.status === "answered" ? "#5cb85c" : "red",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="register">{item.createdFormat}</td>
                      <td data-label="#">
                        <button
                          onClick={() => {
                            toggleModal(item);
                          }}
                          className="action"
                          title="See information"
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch color="#fff" size={17} />
                        </button>
                        <Link
                          to={`/new/${item.id}`}
                          className="action"
                          title="Edit call"
                          style={{ backgroundColor: "#f6a935" }}
                        >
                          <FiEdit2 color="#fff" size={17} />
                        </Link>
                        <button
                          onClick={() => handleDeleteCall(item.id)}
                          className="action"
                          title="Delete Call"
                          style={{ backgroundColor: "#8d2204" }}
                        >
                          <FiDelete color="#fff" size={17} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {loadingMore && <h3 className="load">Search more tickets....</h3>}
            {!loadingMore && !isEmpty && (
              <button onClick={handleMore} className="btn-more">
                Loading More
              </button>
            )}
          </>
        )}
      </div>
      {showModal && (
        <Modal content={detail} close={() => setShowModal(!showModal)} />
      )}
    </div>
  );
};

export default Dashboard;
