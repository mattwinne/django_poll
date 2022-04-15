import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchWrapper, header } from "../fetchWrapper";

export default function SignOut() {
  const history = useHistory();

  useEffect(() => {
    fetchWrapper.post("/api/user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    header.Authorization = null;
    history.push("/login");
  });
  return <div>Logout</div>;
}
