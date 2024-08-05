// app/register/page.tsx
"use client"; // This line makes this component a Client Component
import React, { useState } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation"; 
import "./register.css"; 

const RegisterPage = () => {
  const router = useRouter(); 
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
    if (name === "") {
      setError("Enter name")
    }
    // Simple validation 
    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid mobile number (10 digits).");
      return;
    }

    if (password.length < 6 ) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (confirmPassword !== password) {
      setError("Password and confrim password is incorrect");
      return;
    }

    const obj = {
      name:name,
      mobileNumber: mobileNumber,
      password:password
    }
    try {
      const res = await axios.post('http://localhost:8080/api/user/register', obj)
      if (res.status === 200) {
        router.push("/login"); 
      }
      console.log(res)
    } catch (error : any) {
      setError(error.response.data.message)
      console.log(error.response.data.message)
    }

   
  };

  const handleLogin = () => {
    router.push("/login"); // Navigate to the Sign Up page
  };
  return (
    <div className="loginContainer">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
      <div className="formGroup">
          <label htmlFor="mobileNumber">Name:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="formGroup">
          <label htmlFor="password">Confirm Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="errorMessage">{error}</div>}
       
        <button type="submit" style={{ marginBottom: "5px" }}>Sign Up</button>
        <button onClick={handleLogin} >Login</button>
      </form>
    </div>
  );
};

export default RegisterPage;
