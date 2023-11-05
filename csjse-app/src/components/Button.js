import React from 'react';

const Button = ({ bg, btnText, textColor }) => {
  return (
    <button className={`bg-${bg} py-4 px-7 text-${textColor}`}>
      {btnText}
    </button>
  );
};

export default Button;
