import { FiPlusCircle } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./new.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/dbfirebase";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const New = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [complement, setComplement] = useState("");
  const [customerSelected, setCustomerSelected] = useState(0);
  const [subject, setSubject] = useState("support");
  const [status, setStatus] = useState("open");
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [idCustomer, setIdCustomer] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const listRef = collection(db, "customers");
      const querSnapshot = await getDocs(listRef)
        .then((snapshot) => {
          let list = [];
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              company: doc.data().company,
            });
          });
          if (snapshot.docs.size === 0) {
            setCustomers([{ id: 1, nomeFatasia: "" }]);
            setLoadCustomers(false);
            return;
          }
          setCustomers(list);
          setLoadCustomers(false);
          if (id) {
            loadId(list);
            setIdCustomer(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadCustomers(false);
          setCustomers([{ id: 1, nomeFatasia: "" }]);
        });
    }
    loadCustomers();
  }, [id]);

  const loadId = async (list) => {
    const docRef = doc(db, "tickets", id);
    await getDoc(docRef)
      .then((snapshot) => {
        setSubject(snapshot.data().subject);
        setStatus(snapshot.data().status);
        setComplement(snapshot.data().complement);

        let index = list.findIndex(
          (item) => item.id === snapshot.data().clientId
        );
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((error) => {
        console.log(error);
        setIdCustomer(false);
      });
  };
  const handleOptionChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  function handleChangeSelect(e) {
    setSubject(e.target.value);
  }
  function handleChangeCustomer(e) {
    setCustomerSelected(e.target.value);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (idCustomer) {
      const docRef = doc(db, "tickets", id);
      await updateDoc(docRef, {
        client: customers[customerSelected].company,
        clientId: customers[customerSelected].id,
        subject: subject,
        complement,
        status,
        userId: user.uid,
      }).then(() => {
        toast.info("Call updated");
        setCustomerSelected(0);
        setComplement("");
        navigate("/dashboard");
      });
      return;
    }
    await addDoc(collection(db, "tickets"), {
      created: new Date(),
      client: customers[customerSelected].company,
      clientId: customers[customerSelected].id,
      subject: subject,
      complement,
      status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("registered call");
        setComplement("");
        setCustomerSelected(0);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title name={id ? "Edit Call" : "New Call"}>
          <FiPlusCircle />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label> Clients</label>
            {loadCustomers ? (
              <input type="text" disabled={true} value="Loading...." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomer}>
                {customers.map((customer, index) => {
                  return (
                    <option key={index} value={index}>
                      {customer.company}
                    </option>
                  );
                })}
              </select>
            )}
            <label> Subject</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value="Support"> Support</option>
              <option value="technical"> Technician</option>
              <option value="finance"> Finance</option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="open"
                onChange={handleOptionChange}
                checked={status === "open"}
                id="open"
              />
              <label htmlFor="open">Open</label>
              <input
                type="radio"
                name="radio"
                value="progress"
                onChange={handleOptionChange}
                checked={status === "progress"}
                id="progress"
              />
              <label htmlFor="progress">Progress</label>

              <input
                type="radio"
                name="radio"
                value="answered"
                onChange={handleOptionChange}
                checked={status === "answered"}
                id="answered"
              />

              <label htmlFor="answered">Answered</label>
            </div>
            <label>Complement</label>
            <textarea
              type="text"
              placeholder="Describe your problem"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            ></textarea>
            <button type="submit" className="submit">
              {idCustomer ? "Edit Call" : "Create Call"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
