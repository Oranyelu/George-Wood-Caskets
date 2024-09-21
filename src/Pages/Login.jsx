import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      console.log("req sent");
      setUser(response.data.token);
      localStorage.setItem("token", response.data.token);
      // Redirect to the desired page
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
    <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Footer />
    </>
  );
};

export default Login;
