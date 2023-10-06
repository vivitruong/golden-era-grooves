import React from 'react';

// add child div to capture mouse event when not focused

function Paint({ onClose, isFocus }) {
  return (
    <>
    <iframe src="https://jspaint.app" width="800" height="600" frameborder="0"></iframe>

    </>
  );
}

export default Paint;
