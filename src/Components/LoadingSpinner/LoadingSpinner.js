import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    }}
  >
    <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
      <div className="lds-dual-ring"></div>
    </div>
    </div>
  );
};

export default LoadingSpinner;
