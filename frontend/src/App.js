import React from "react";
import "./App.css";
import StockList from "./components/StockList";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <LoginButton />
      <LogoutButton />
      <Profile />
      <StockList />
    </>
  );
};

export default App;
