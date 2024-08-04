// app/login/page.tsx

// app/login/page.tsx
"use client"; // This line makes this component a Client Component
import React, { useState } from "react";
import "./login.css"; 

const LoginPage = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Simple validation
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid mobile number (10 digits).");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Proceed with form submission (e.g., send data to the server)
    console.log("Mobile Number:", mobileNumber);
    console.log("Password:", password);
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="errorMessage">{error}</div>}
        <button type="submit">Login</button>
        <button style={{marginTop:"3px"}}>Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
