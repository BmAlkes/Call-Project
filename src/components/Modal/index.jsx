import { FiX } from "react-icons/fi";
import "./modal.css";

const Modal = () => {
  return (
    <div className="modal">
      <div className="container">
        <button className="close">
          <FiX size={25} color="#fff" />
          back
        </button>
        <main>
          <h2>Detail Call</h2>
          <div className="row">
            <span>
              Client : <i>Market</i>
            </span>
          </div>
          <div className="row">
            <span>
              Subject : <i>Market</i>
            </span>
            <span>
              Registered on : <i>22/2</i>
            </span>
          </div>
          <div className="row">
            <span>
              status : <i>Market</i>
            </span>
          </div>
          <>
            <h3>Complement</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              repellat ipsa quo laudantium animi provident vitae saepe hic
              consequuntur officia cum aperiam corporis quibusdam perferendis
              adipisci ad, veritatis distinctio modi!
            </p>
          </>
        </main>
      </div>
    </div>
  );
};

export default Modal;
