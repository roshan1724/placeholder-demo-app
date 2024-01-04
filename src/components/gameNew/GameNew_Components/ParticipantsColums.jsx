import { Avatar, AvatarGroup, Tooltip } from "@mui/material";
import DescriptionBox from "./DescriptionBox";

function ParticipantsColumn({ participants }) {
  function stringAvatar(name) {
    return {
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <div>
      <Tooltip
        title={<DescriptionBox detailsList={participants} />}
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
              },
            },
          }}
          className="avatar-wrapper"
          max={3}
          total={participants.length}
        >
          {participants.map((curElem, index) => {
            return (
              <Avatar
                sx={{
                  height: "30px",
                  width: "28px",
                  background: "#1D1D1D",
                  color: "#808080",

                  borderColor: "#808080",
                  borderStyle: "solid",
                  borderWidth: 1,
                }}
                className="avatar-element"
                src={curElem.profile_img}
                key={index}
                {...stringAvatar(curElem.user_name)}
              />
            );
          })}
        </AvatarGroup>
      </Tooltip>
    </div>
  );
}

export default ParticipantsColumn;
