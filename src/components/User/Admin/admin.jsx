import React from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../utilities/constants";

export function AdminHome() {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary btn-filled"
      onClick={() => navigate(ROUTE_PATHS.ADMIN_GAME)}
    >
      <span className="me-2">
        <i className="fa-solid fa-eye"></i>
      </span>
      View All Games
    </button>
  );
}
export default AdminHome;
