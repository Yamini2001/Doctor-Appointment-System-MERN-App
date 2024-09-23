import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  // State to store user data
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null);     // State to manage error

  // Fetch user data from the API
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUserData(res.data); // Set user data to the state
      setLoading(false);     // Turn off loading
    } catch (err) {
      setError("Error fetching user data"); // Handle error message
      console.log(err);
      setLoading(false);
    }
  };

  // Trigger user data fetch when component mounts
  useEffect(() => {
    getUserData();
  }, []);

  // If loading, show a loading indicator
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // If error, show an error message
  if (error) {
    return <h2>{error}</h2>;
  }

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
