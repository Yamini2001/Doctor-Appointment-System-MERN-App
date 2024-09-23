import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/auth/getUserData", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserData(res.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching user data");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Home Page</h1>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}</h2>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>No user data available</p>
      )}
    </div>
  );
};

export default HomePage;
