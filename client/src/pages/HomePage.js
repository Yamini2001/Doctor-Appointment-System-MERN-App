import React, { useEffect } from "react";
import axios from "axios";
const HomePage = () => {
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //it the data from the user
    getUserData();
  }, []);
  return (
    <div>
      <h1>Welcome HomePage</h1>
    </div>
  );
};

export default HomePage;