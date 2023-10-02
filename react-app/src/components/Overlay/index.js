import ReactDOM from "react-dom";
import "./style.css";

const Overlay = ({ onClose }) => {
  return ReactDOM.createPortal(
    <div className="overlay" onClick={onClose}></div>,
    document.querySelector("#overlay")
  );
};

export default Overlay;
