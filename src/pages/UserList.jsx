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
        if (data.status === 200) {
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
    <div className="p-6 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-6 py-3 border-b">Username</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">First Name</th>
              <th className="px-6 py-3 border-b">Last Name</th>
              <th className="px-6 py-3 border-b">Email Verified</th>
              <th className="px-6 py-3 border-b">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {users.map((user, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150 border-b"
              >
                <td className="px-6 py-3">{user.username}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.firstname}</td>
                <td className="px-6 py-3">{user.lastname}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${user.email_verified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.email_verified ? "Verified" : "Not Verified"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${user.active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default UserList;
