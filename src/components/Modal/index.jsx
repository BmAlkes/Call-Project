/* eslint-disable react/prop-types */
import { FiX } from "react-icons/fi";
import "./modal.css";

const Modal = ({ content, close }) => {
  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={25} color="#fff" />
          back
        </button>
        <main>
          <h2>Information Ticket</h2>
          <div className="row">
            <span>
              Client : <i>{content.client}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Subject : <i>{content.subject}</i>
            </span>
            <span>
              Registered on : <i>{content.createdFormat}</i>
            </span>
          </div>
          <div className="row">
            <span>
              status :{" "}
              <i
                style={{
                  color: "#FFF",
                  backgroundColor:
                    content.status === "answered" ? "#5cb85c" : "#999",
                }}
              >
                {content.status}
              </i>
            </span>
          </div>
          <>
            <h3>Complement</h3>
            <p>{content.complement}</p>
          </>
        </main>
      </div>
    </div>
  );
};

export default Modal;
