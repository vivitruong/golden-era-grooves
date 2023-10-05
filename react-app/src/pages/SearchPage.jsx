import InputField from "../components/InputField";
const SearchPage = () => {
  return (
    <div>
      <InputField
        placeholder={"What do you want to listen to?"}
        name={"search-song"}
        type={"text"}
      />
    </div>
  );
};

export default SearchPage;
