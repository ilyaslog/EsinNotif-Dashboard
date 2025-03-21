import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App';
import Login from './screens/Login';
import MainNotification from './screens/MainNotification';
import TimeTable from './components/TimeTable'; // Importez le composant TimeTable
import './index.css';

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn ? <App onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        <Route path="/notifications" element={<MainNotification />} />
        <Route path="/timetable" element={<TimeTable />} /> {/* Ajoutez cette route */}
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);