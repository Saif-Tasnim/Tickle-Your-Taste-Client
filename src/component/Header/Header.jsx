import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { LoadingPage } from "../LoadingPage";

const Header = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
     return <LoadingPage />;
  }

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Header;
