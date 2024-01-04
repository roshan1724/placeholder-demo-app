import { SvgIcon } from "@mui/material";
import { useState } from "react";

function SortableColumnHeader(props) {
  const { headName } = props;

  const [arrow1, setArrow1] = useState(true);
  const [arrow2, setArrow2] = useState(false);

  function handleClick1() {
    setArrow1(true);
    setArrow2(false);
  }
  function handleClick2() {
    setArrow1(false);
    setArrow2(() => {
      return true;
    });
  }

  return (
    <div className="StartDateHeader-wrapper">
      <span>{headName}</span>
      <SvgIcon className="arrowButton-wrapper">
        <svg
          id="arrowww"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 9 12"
          onClick={() => handleClick1()}
        >
          <path
            id="waswas"
            d="M5.02974 0.970215C4.73677 0.677246 4.26099 0.677246 3.96802 0.970215L0.218018 4.72021C-0.0749512 5.01318 -0.0749512 5.48896 0.218018 5.78193C0.510986 6.0749 0.986768 6.0749 1.27974 5.78193L3.75005 3.30928V10.4999C3.75005 10.9147 4.08521 11.2499 4.50005 11.2499C4.91489 11.2499 5.25005 10.9147 5.25005 10.4999V3.30928L7.72036 5.77959C8.01333 6.07256 8.48911 6.07256 8.78208 5.77959C9.07505 5.48662 9.07505 5.01084 8.78208 4.71787L5.03208 0.967871L5.02974 0.970215Z"
            fill={arrow1 ? "#F6AB36" : "#808080"}
          ></path>
        </svg>
      </SvgIcon>
      <SvgIcon>
        <svg
          id="arrowww"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 9 12"
          fill="none"
          onClick={() => handleClick2()}
        >
          <path
            d="M5.02974 11.0298C4.73677 11.3228 4.26099 11.3228 3.96802 11.0298L0.218018 7.27979C-0.0749512 6.98682 -0.0749512 6.51104 0.218018 6.21807C0.510986 5.9251 0.986768 5.9251 1.27974 6.21807L3.75005 8.69072V1.5001C3.75005 1.08525 4.08521 0.750097 4.50005 0.750097C4.91489 0.750097 5.25005 1.08525 5.25005 1.5001V8.69072L7.72036 6.22041C8.01333 5.92744 8.48911 5.92744 8.78208 6.22041C9.07505 6.51338 9.07505 6.98916 8.78208 7.28213L5.03208 11.0321L5.02974 11.0298Z"
            fill={arrow2 ? "#F6AB36" : "#808080"}
          ></path>
        </svg>
      </SvgIcon>
    </div>
  );
}

export default SortableColumnHeader;
