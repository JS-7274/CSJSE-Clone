import React from 'react';

const Button = ({ bg, btnText, textColor }) => {
  return (
    <button className={`bg-${bg} py-4 px-7 font-bold text-${textColor}`}>
      {btnText}
    </button>
  );
};

export default Button;
