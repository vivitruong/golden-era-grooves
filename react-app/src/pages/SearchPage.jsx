import Button from "../components/Button";
import InputField from "../components/InputField";
import {useState, useEffect} from 'react'
import Divider from '../components/Divider'
import ActionBar from '../components/ActionBar'

const CLIENT_ID='8fdd8f8ad1134098af96799b51f862ad'
const CLIENT_SECRET='41ed17b571b842418ac8b69891d414ed'
const SearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [albums, setAlbums] = useState([])
  useEffect(() => {
    let authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error(error));
  }, [])

  async function search () {
    console.log('search for' + searchInput)

    //Get req using search to get artist Id
    let searchParameters = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    };

    let artistId = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
      .then(res => res.json())
      .then(data => {
        return data.artists.items[0].id
      })
      console.log('Artist Id ' + artistId)



    //Get req with Artist Id grab all ablum
    let returnAlbums = await fetch(
      'https://api.spotify.com/v1/artists/' + artistId + '/top-tracks?country=US&limit=15',
      searchParameters
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAlbums(data.tracks)
      })
    //display to user
  }
  return (
    <>

    <div className="search-container">
    <Divider />
    <ActionBar />
    <Divider/>
    <h3 style={{padding: '10px'}}>Find the latest tracks released by your favorite artist here  ... <img src='https://win98icons.alexmeub.com/icons/png/directory_explorer-0.png'></img> </h3>
    <div className="search-bar">
      <InputField
        placeholder="Who do you want to listen to?"
        name="search-song"
        type="input"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            search();
          }
        }}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button onClick={search}>Search <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-1.png"></img></Button>
    </div>
    <div className="results">
      {albums && albums.length > 0 ? (
        albums.map((album, i) => {
          return (
            <div className="album-card" key={i}>

              <p>{album?.name}</p>

            </div>

          );
        })
      ) :

       (

        <p>No albums found.</p>
      )}
    </div>
  </div>
  </>
);
};

export default SearchPage;
