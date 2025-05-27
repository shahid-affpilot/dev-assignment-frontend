import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/register', formData);
      alert("Registration successful");
    } catch (err) {
      alert("Error: " + (err.response?.data || "Something went wrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} value={formData.username} required /><br />
      <input name="email" placeholder="Email" onChange={handleChange} value={formData.email} required /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password} required /><br />
      <input name="first_name" placeholder="First Name" onChange={handleChange} value={formData.first_name} required /><br />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} value={formData.last_name} required /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;