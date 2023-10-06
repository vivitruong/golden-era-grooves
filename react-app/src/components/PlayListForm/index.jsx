import Button from "../Button";
import InputField from "../InputField";

const PlayListForm = ({
  submitHandler,
  name,
  description,
  setName,
  setDescription,
  btnText,
}) => {
  return (
    <div>
      <form action="" onSubmit={submitHandler} className="form">
        <InputField
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Name"
        />
        <InputField
          className="input field-row-stacked"
          required
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          type="textarea"
          placeholder="Description"

        />

        <Button iconOnly>{btnText}</Button>
      </form>
    </div>
  );
};

export default PlayListForm;
