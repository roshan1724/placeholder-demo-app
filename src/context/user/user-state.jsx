import React, { useEffect, useState } from "react";
import UserContext from "./user-context";

const UserState = (props) => {
  const [userDataList, setUserDataList] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("/data/user-data.json")
      .then((response) => response.json())
      .then((response) => {
        setUserDataList(response.data);
        setUserData(response.data[0]);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const updateUserAchievements = ({ user_id, linked_achievements }) => {
    const updateUserData = userDataList.map((user) => {
      if (user.user_id === user_id) {
        return {
          ...user,
          achievements: [...user.achievements, ...linked_achievements],
        };
      }
      return user;
    });
    console.log("Updated User Data List ==> ", updateUserData);
    setUserDataList(updateUserData);
    setUserData(updateUserData[0]);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserAchievements }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
