import "./style.css";

const InputField = ({ placeholder, type, name, value, onChange, id }) => {
  return (
    <input
      className="input"
      required
      name={name}
      value={value}
      onChange={onChange}
      id={id}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default InputField;
