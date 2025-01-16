import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetInputScreen from './Screens/GetInputScreen';
import DisplayOutputScreen from './Screens/DisplayOutputScreen';


export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<GetInputScreen />} />
          <Route path="/Output" element={<DisplayOutputScreen />} />
          <Route path="/getinputscreen" element={<GetInputScreen />} />
        </Routes>
      </div>
    </Router>
  )
}