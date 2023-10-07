import React from 'react';
import Divider from '../Divider'
// add child div to capture mouse event when not focused

function Paint({ onClose, isFocus }) {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   // Use the full viewport height
  };
  return (
    <>

    <div>
    <h3>Let's have some fun while listening to music! 🎨</h3>
    <Divider/>
    <iframe src="https://jspaint.app" width="800" height="600" frameborder="0"></iframe>
    </div>
    </>
  );
}

export default Paint;
