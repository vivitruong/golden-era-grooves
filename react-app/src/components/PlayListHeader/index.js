import { Link } from "react-router-dom";
import icon from "../../assets/file_icon_bl.svg";
import iconUser from "../../assets/user_computer.svg";
import Button from "../Button";
import "./style.css";

const PlayListHeader = ({ playlistName = "My Heart Will Go On" }) => {
  return (
    <div className="container_playListHeader">
      <div className="playListHeader">
        <div className="icon">
          <img src={icon} alt="" />
        </div>
        <div>
          <p>Playlist</p>
          <h2>{playlistName}</h2>
          <p>{"Hello, 12 songs"}</p>
        </div>
      </div>
      <Link>
        <Button>
          <img src={iconUser} alt="" />
          github.com
        </Button>
      </Link>
    </div>
  );
};

export default PlayListHeader;
