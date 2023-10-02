import "./style.css";

const Button = ({ onClick, children, iconOnly, className }) => {
  const buttonClass = `btn  btn-primary ${
    iconOnly ? "icon-only" : ""
  } ${className}`;

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
