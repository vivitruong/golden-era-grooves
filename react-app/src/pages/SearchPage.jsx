import InputField from "../components/InputField";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { playSong } from "../slices/songsSlice";
const SearchPage = () => {
  const [input, setInput] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [focus, setFocus] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      if (input.trim() === "") {
          setShowResult(false);
          return;
      }
      const searchInput = input.toLowerCase();
      const result = fetch(`/api/songs/search/${searchInput}`)
          .then(res => res.json())
          .then(res => {
              setShowResult(true);
              if (res.length === 0) {
                  setSearchResult([]);
              }
              setSearchResult(res);
          })
          .catch(e => console.log(e));
  }, [input]);
  const onSongClick = (song) => () => {
    const songInfo = { name: song.song, id: song.id, artist: song.artist };
    dispatch(playSong({ list: [songInfo] }));
    setShowResult(false);
  }

  const clearSearch = () => {
    // setShowResult(false);
    setFocus(false);
};

const onChange = (e) => {
    setInput(e.target.value);
};

const onFocus = () => {
    setFocus(true);
};

  return (
    <div>
      <InputField
        placeholder={"What do you want to listen to?"}
        name={"search-song"}
        type={"text"}
        value={input}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={clearSearch}
      />
        {
                searchResult.length > 0 && showResult &&
                < div className='search-result' >
                    {
                        searchResult.map(ele => (
                            <div>
                                <div className="search-result-song"  onClick={onSongClick(ele)} >
                                    <div className="search-play-button">
                                        <i className="fa-solid fa-play" id="play-btn" ></i>
                                    </div>
                                    <div className="search-result-info">
                                        <span className="search-result-songname">{ele.song}</span>
                                        <span className="search-result-artist">{ele.artist}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
            {
                searchResult.length === 0 && showResult &&
                <div className='search-result no-result'>
                    <span className="search-result-no">Oops, looks like the song you were looking for isn't available 😔. </span>
                </div>
            }
    </div>
  );
};


export default SearchPage;
