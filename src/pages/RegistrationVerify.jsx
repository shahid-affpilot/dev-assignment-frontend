import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const RegistrationVerify = () => {
  const [message, setMessage] = useState("Verifying...");
  const [status, setStatus] = useState("");
  const location = useLocation();

  // Helper to extract token from query string
  const getTokenFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get("token");
  };

  useEffect(() => {
    const token = getTokenFromURL();
    if (!token) {
      setMessage("No token found in URL.");
      setStatus("error");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/auth/verify?token=${token}`,
          { withCredentials: true }
        );

        const { status, message } = res.data;
        if (status === 200) {
          setMessage(message || "Email verified successfully.");
          setStatus("success");
        } else {
          setMessage(message || "Verification failed.");
          setStatus("error");
        }
      } catch (err) {
        setMessage("An error occurred during verification.");
        setStatus("error");
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white px-8 py-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className={`text-lg ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default RegistrationVerify;
