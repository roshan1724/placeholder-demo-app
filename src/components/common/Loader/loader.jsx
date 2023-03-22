import React from 'react';

function Loader(props) {
  return (
    <div className='loader'>
      <span className="icon-wrapper">
        <i className="fa-solid fa-circle-notch fa-spin"></i>
      </span>
    </div>
  );
}

export default Loader;