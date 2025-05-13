import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './templates/Login';
import Register from './templates/Register';
import Home from './templates/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
