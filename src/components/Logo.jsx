import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="w-10">
      <img 
        src="src\assets\logo.png"
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
