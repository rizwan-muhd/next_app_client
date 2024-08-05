// app/login/page.tsx

// app/login/page.tsx
"use client"; // This line makes this component a Client Component
import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation"; 
import "./login.css"; 

const LoginPage = () => {
  const router = useRouter(); 
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
    const obj = {
      mobileNumber: mobileNumber,
      password:password
    }
    try {
      const res = await axios.post('http://localhost:8080/api/user/login', obj)
      if (res.status === 200) {
        localStorage.setItem("token" ,res.data.token)
        router.push("/home"); 
      }
      console.log(res)
    } catch (error : any) {
      setError(error.response.data.message)
      console.log(error.response.data.message)
    }

    // Proceed with form submission (e.g., send data to the server)
    console.log("Mobile Number:", mobileNumber);
    console.log("Password:", password);
  };

  const handleSignUp = () => {
    router.push("/register"); // Navigate to the Sign Up page
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
        <button style={{marginTop:"5px"}} onClick={handleSignUp} >Sign Up</button>
      </form>
    </div>
  );
};

export default LoginPage;
