import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/users", {
        withCredentials: true,
      });

      const { data } = response;
      if (data.status === "202") {
        setUsers(data.data);
      } else {
        setError("Failed to load users.");
      }
    } catch (err) {

      console.log(response)
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);


  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email Verified</th>
            <th className="py-2 px-4 border-b">Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.firstname}</td>
              <td className="py-2 px-4 border-b">{user.lastname}</td>
              <td className="py-2 px-4 border-b">
                {user.email_verified ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b">
                {user.active ? "Active" : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
