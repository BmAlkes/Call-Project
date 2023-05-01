import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/dbfirebase";
import { toast } from "react-toastify";

const Customers = () => {
  const [company, setCompany] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (company !== "" && companyNumber !== "" && adress !== "") {
      await addDoc(collection(db, "customers"), {
        company,
        חפ: companyNumber,
        adress,
        phone,
      })
        .then(() => {
          setCompany("");
          setCompanyNumber("");
          setAdress("");
          setPhone("");
          toast.success("successfully registered customer");
        })
        .catch((error) => {
          console.log(error);
          toast.error("failed to register customer");
        });
    } else {
      toast.error("Fill all files");
    }
  };
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Customers">
          <FiUser size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label> Company Name</label>
            <input
              type="text"
              placeholder="company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <label>ח.פ</label>
            <input
              type="text"
              placeholder="ח.פ חברה"
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
            />
            <label>Adress</label>
            <input
              type="text"
              placeholder="Adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
            />
            <label>Phone</label>
            <input
              type="number"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="submit" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Customers;
