import React from "react";
import { Cinemas } from "../components";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div className="App">
      <Cinemas />
      <Outlet />
    </div>
  );
};

export default MainLayout;
