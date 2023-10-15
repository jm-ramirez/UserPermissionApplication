import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewPermission } from './pages/NewPermission';


export function RouteApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-permission" element={<NewPermission />} />
      </Routes>
    </Router>
  );
}
