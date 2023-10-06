import React from 'react';

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
    <iframe src="https://jspaint.app" width="800" height="600" frameborder="0"></iframe>
    </div>
    </>
  );
}

export default Paint;
