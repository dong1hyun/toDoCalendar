import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import Days from './Routes/Days';
import Home from './Routes/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/days/:year/:month" element={<Home />} />
        <Route path="/months/:year" element={<Home />} />
        <Route path="/years" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
