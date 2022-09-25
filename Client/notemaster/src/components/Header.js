import React from "react";

const Header = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 15%",
        gap: "20px",
        background: "gold",
        color: "crimson",
        fontSize: "1.5rem",
      }}
    >
      <h1>Note Master</h1>
      <h4>Welcome</h4>
    </div>
  );
};

export default Header;
