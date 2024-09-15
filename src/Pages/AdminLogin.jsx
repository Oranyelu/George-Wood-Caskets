import React, { useState } from "react";
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your authentication API
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      // Handle successful login
      const { token } = await response.json();
      localStorage.setItem("adminToken", token);
      // Redirect to dashboard or show a success message
    } else {
      // Handle login failure
    }
  };

  return (
    <div className="bg-custom-gradient min-h-screen flex flex-col font-montserrat">
      <section>
        <Header />
      </section>
      <section  className="mt-[120px] h-[50em] flex place-items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button type="submit" className="bg-[#135B3A] text-white w-[300px] h-[56px] rounded-[5px]">Login</button>
        </form>
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default AdminLogin;
