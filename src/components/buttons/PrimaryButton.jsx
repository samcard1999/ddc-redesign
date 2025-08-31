import React from "react";

const PrimaryButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 
        border border-primary 
        rounded-full       
        font-bold 
        tracking-wide 
        hover:bg-white/10 
        transition-colors 
        duration-300
        w-fit
        h-fit
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
