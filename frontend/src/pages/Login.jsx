import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !userName)) {
      alert("Remplis tous les champs !");
      return;
    }
    try {
      if (isLogin) {
        const res = await axios.post("http://localhost:8080/api/auth/login", { email, password, userName });
        if (res.data) {
          localStorage.setItem("user", JSON.stringify(res.data));
          navigate("/dash");
        } else {
          alert("Email ou mot de passe incorrect");
        }
      } else {
          const res = await axios.post("http://localhost:8080/api/auth/register", { email, password, userName });
          if (res.data) {
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("Compte créé avec succès !");
            setIsLogin(true);
            navigate("/dash");
          } else {
            alert("Erreur lors de la création du compte");
          }
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion avec le serveur");
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/dash");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8 sm:p-10 text-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          {isLogin ? 'Connexion' : 'Inscription'}
        </h1>

        {!isLogin && (
          <input
            className="border border-gray-600 p-3 w-full mb-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Nom d'utilisateur"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        )}

        <input
          className="border border-gray-600 p-3 w-full mb-4 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-600 p-3 w-full mb-6 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg w-full font-medium transition-colors duration-200"
        >
          {isLogin ? "Se connecter" : "Créer un compte"}
        </button>

        <p className="mt-6 text-sm text-gray-400 text-center">
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <span
            className="text-blue-400 cursor-pointer hover:underline font-medium"
            onClick={toggleMode}
          >
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}
