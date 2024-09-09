import React from 'react';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Navigation Links */}
        <nav>
          <Link to="/" style={{ margin: '0 10px' }}>HomePage</Link>
          <Link to="/login" style={{ margin: '0 10px' }}>LoginPage</Link>
          <Link to="/register" style={{ margin: '0 10px' }}>Register</Link>
        </nav>
        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
