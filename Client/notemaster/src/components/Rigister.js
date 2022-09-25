import React, { useEffect, useState } from "react";

const Register = ({ registerUser, loginUser, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUser, setIsUser] = useState(user.username);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username) {
      loginUser({ username, password });
    } else {
      registerUser({ username, password });
    }
    setPassword("");
    setUsername("");
  };
  useEffect(() => {
    setIsUser((prev) => !prev);
  }, [user.username]);
  return (
    <div
      style={{
        width: "400px",
        padding: "2rem",
        boxShadow: "0 0 4px rgba(0,0,0,0.5)",
        margin: "10px auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label htmlFor="username">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          style={{
            padding: "8px 16px",
            color: "white",
            background: "purple",
            border: "none",
            marginTop: "10px",
          }}
        >
          {isUser === true ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
