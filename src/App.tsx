import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, SessionPage } from "./components";
import MainLayout from "./layouts/MainLayout";
import MoviePage from "./components/MoviePage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/movie/:movieid/session/:id" element={<SessionPage />} />
      </Route>
    </Routes>
  );
};

export default App;
