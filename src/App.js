import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("Not clicked");

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div onClick={() => setMessage("Clicked")}>{message}</div>
    </div>
  );
}

export default App;
