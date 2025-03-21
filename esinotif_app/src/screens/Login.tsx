import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email et mot de passe requis.');
      return;
    }
  
    console.log("Tentative de connexion avec :", email, password); // Log des données envoyées
  
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Réponse du serveur :", data); // Log de la réponse du serveur
  
      if (response.ok) {
        onLogin();
      } else {
        setError(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error("Erreur lors de la connexion au serveur :", error); // Log des erreurs réseau
      setError('Erreur lors de la connexion au serveur.');
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/uir.jpg')` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 bg-opacity-90">
        <div className="flex justify-center mb-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-32 h-32 shadow-lg rounded-full"
          />
        </div>

        <h2 className="text-2xl font-semibold text-[#167BB4] mb-4 text-center">Admin Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#167BB4]"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#167BB4]"
        />
        
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-[#167BB4] text-white rounded hover:bg-[#135F8C] transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;