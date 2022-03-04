import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { fetchHeaders, fetchWrapper } from "../newFetchWrapper";

export default function SignOut() {
  const history = useHistory();

  useEffect(() => {
    fetchWrapper.post("/api/user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    fetchHeaders.Authorization = null;
    history.push("/login");
  });
  return <div>Logout</div>;
}
