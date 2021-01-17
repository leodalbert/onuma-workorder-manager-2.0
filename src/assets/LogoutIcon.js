import React, { memo } from 'react';

const LogoutIcon = () => {
  return (
    <svg
      height='38px'
      width='38px'
      fill='#000000'
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      x='0px'
      y='0px'
      viewBox='1 -1 100 100'>
      <title>Log Out</title>
      <g>
        <path d='M5.4,85l30,10V5l-30,10V85z M30.4,47c1.7,0,3,1.3,3,3s-1.3,3-3,3s-3-1.3-3-3S28.8,47,30.4,47z'></path>
        <path d='M80.4,37.9l-1.7,1.7c-0.8,0.8-0.8,2,0,2.8l4.4,4.4H51.4V17c0-1.1-0.9-2-2-2h-6c-1.1,0-2,0.9-2,2v1c0,1.1,0.9,2,2,2h1   c1.1,0,2,0.9,2,2v56c0,1.1-0.9,2-2,2h-1c-1.1,0-2,0.9-2,2v1c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V53.2h31.8l-4.4,4.4   c-0.8,0.8-0.8,2,0,2.8l1.7,1.7c0.8,0.8,2,0.8,2.8,0L94,51.4c0.8-0.8,0.8-2,0-2.8L83.3,37.9C82.5,37.1,81.2,37.1,80.4,37.9z'></path>
      </g>
    </svg>
  );
};

export default memo(LogoutIcon);
