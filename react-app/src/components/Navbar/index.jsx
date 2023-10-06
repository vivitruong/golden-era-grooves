import { Link } from "react-router-dom";
import Button from "../Button";
import Divider from "../Divider";
import iconHome from "../../assets/homepage-1.svg";
import iconSearch from "../../assets/search_web-1.svg";
import iconComputer from "../../assets/computer_sound-1.svg";
import iconCreatePlaylist from "../../assets/cd_drive-1.svg";
import iconLiked from "../../assets/loudspeaker_green.svg";
import iconEpisode from "../../assets/channels-1.svg";
import "./style.css";

const Navbar = () => {
  const onClickHandler = () => {
    console.log("hi");
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <Button onClick={onClickHandler}>
                <img src={iconHome} alt="" />
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/search">
              <Button onClick={onClickHandler}>
                <img src={iconSearch} alt="" />
                Search
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/library">
              <Button onClick={onClickHandler}>
                <img src={iconComputer} alt="" />
                Your Library
              </Button>
            </Link>
          </li>
        </ul>
        <Divider />
        <ul>
          <li>
            <Link to="/create-playlist">
              <Button onClick={onClickHandler}>
                <img src={iconCreatePlaylist} alt="" />
                Create Playlist
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/liked-songs">
              <Button onClick={onClickHandler}>
                <img src={iconLiked} alt="" />
                Liked Songs
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button onClick={onClickHandler}>
                <img src={iconEpisode} alt="" />
                Your Episodes
              </Button>
            </Link>
          </li>

          <li>
            <Link to="/paint">
              <Button onClick={onClickHandler}>
                <img style={{width: '20px'}} src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/jspaint.svg' alt="" />
                Paint
              </Button>
            </Link>
          </li>

        </ul>
        <Divider />
      </nav>
    </header>
  );
};

export default Navbar;
