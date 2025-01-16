import React from 'react'
import { useLocation } from 'react-router-dom';

function DisplayOutputScreen() {

  const location = useLocation()
  const { topic } = location.state;
  return (
    <div>
      <h1>{topic}</h1>
    </div>
  )
}

export default DisplayOutputScreen;
