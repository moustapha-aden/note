import React, { useState } from "react";
import axios from "axios";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    id: null,
    userName: "Nom d'utilisateur",
    email: "email@example.com",
  };

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;
  setUser({ 
    ...user, 
    [name === "name" ? "userName" : name]: value 
  });
};


  const handleSave = async () => {
    if (!user.id) return alert("Utilisateur invalide");

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/auth/${user.id}`,
        {
          userName: user.nauserNameme,
          email: user.email,
          password: user.password || "", // facultatif si on veut changer le mot de passe
        }
      );
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setEditMode(false);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour du profil");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Profil</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-gray-500 text-sm">Nom</h2>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={user.userName}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />

          ) : (
            <p className="text-gray-800 font-medium">{user.userName}</p>
          )}
        </div>

        <div>
          <h2 className="text-gray-500 text-sm">Email</h2>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            <p className="text-gray-800 font-medium">{user.email}</p>
          )}
        </div>

        {editMode && (
          <div>
            <h2 className="text-gray-500 text-sm">Ansciens mot de passe</h2>
            <input
              type="password"
              name="password"
              value={""}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>

        )}
        {editMode && (
          <div>
            <h2 className="text-gray-500 text-sm">Nouveau mot de passe</h2>
            <input
              type="password"
              name="newPassword"
              value={""}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
              placeholder="Laisser vide pour ne pas changer"
            />
          </div>
        )}

      </div>

      <div className="mt-6">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mr-2"
              disabled={loading}
            >
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md"
              disabled={loading}
            >
              Annuler
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
          >
            Modifier le profil
          </button>
        )}
      </div>
    </div>
  );
}
