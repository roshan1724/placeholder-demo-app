import { Avatar } from "@mui/material";
import React from "react";

function DescriptionBox({ detailsList }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <div>
      {detailsList.map((curElem, index) => {
        return (
          <div key={index} className="description-wrapper">
            <Avatar
              src={curElem.profile_img}
              {...stringAvatar(curElem.user_name)}
              sx={{
                backgroundColor: "#1D1D1D",
                color: "#FFF",
                border: 2,
                borderColor: "#808080",
              }}
            />
            <div className="description-user-data">
              <span className="description-user-name">{curElem.user_name}</span>
              <span className="description-user-dept">{curElem.user_dept}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DescriptionBox;
