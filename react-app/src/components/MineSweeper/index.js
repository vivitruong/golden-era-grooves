import React from 'react';
import Divider from '../Divider'
function MinesweeperEmbed() {
    return (
      <><div>
         <h3>Let's have some fun while listening to music!🎮</h3>
    <Divider/>
      <iframe
        title="Minesweeper Game"
        src="https://98.js.org/programs/minesweeper/"
        width="800"
        height="600"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      </div>
      </>
    )
}
export default MinesweeperEmbed;
