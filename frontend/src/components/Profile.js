import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <p style={{ color: "red" }}>{user.email}</p>
        <p>Thanks for logging in, now you can vote!</p>
      </div>
    )
  );
};

export default Profile;
