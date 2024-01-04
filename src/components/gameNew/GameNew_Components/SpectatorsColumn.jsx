import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import DescriptionBox from "./DescriptionBox";

function SpectatorsColumn({ spectators }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <div>
      <Tooltip
        title={<DescriptionBox detailsList={spectators} />}
        placement="right"
        arrow
      >
        <AvatarGroup
          componentsProps={{
            additionalAvatar: {
              sx: {
                height: "30px",
                width: "28px",
                background: "#1D1D1D",
                color: "#808080",
              },
            },
          }}
          className="avatar-wrapper"
          max={3}
          total={spectators.length}
        >
          {spectators.map((curElem, index) => {
            return (
              <Avatar
                sx={{
                  height: "30px",
                  width: "28px",
                  background: "#1D1D1D",
                  color: "#808080",
                  border: "3px solid #808080",
                }}
                src={curElem.profile_img}
                {...stringAvatar(curElem.user_name)}
                key={index}
              />
            );
          })}
        </AvatarGroup>
      </Tooltip>
    </div>
  );
}

export default SpectatorsColumn;
