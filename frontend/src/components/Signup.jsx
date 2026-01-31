import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    college: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...data.user, token: data.token })
        );
        navigate("/");
      } else {
        alert(data.message || "Signup failed");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (_error) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="college"
            placeholder="College"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary w-100" disabled={loading}>
            Signup
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;