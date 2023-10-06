import InputField from "../components/InputField";
import Search from "../components/SearchBar";
const SearchPage = () => {
  return (
    <>
    {/* <Search/> */}
    <div>
      <Search
        placeholder={"What do you want to listen to?"}
        name={"search-song"}
        type={"text"}
      />
    </div>
    </>
  );
};

export default SearchPage;
