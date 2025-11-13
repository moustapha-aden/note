// Dash.js
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import Profile from "./Profile";
import axios from "axios";

export default function Dash() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) window.location.href = "/";


  const [activePage, setActivePage] = useState("notes");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/notes/" + user.id);
      setNotes(res.data);
    } catch (err) {
      console.error("Erreur de chargement des notes", err);
    }
  };
// --- Supprimer une note ---
const onDeleteNote = async (id) => {
  await axios.delete("http://localhost:8080/api/notes/" + id);
  setNotes(notes.filter(n => n.id !== id));
};
  useEffect(() => {
    fetchNotes();
  }, []);

// - Ajouter une note ---
const onAddNote = async (newNote) => {
  console.log("Ajout de la note :", newNote);
  try {
    const res = await axios.post("http://localhost:8080/api/notes", newNote);
    // Mettre à jour la liste localement
    setNotes((prevNotes) => [...prevNotes, res.data]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de la note", err);
    alert("Impossible d'ajouter la note");
  }
};

// --- Éditer une note ---
const onEditNote = async (updatedNote) => {
  console.log("Édition de la note :", updatedNote);
  try {
    const res = await axios.put(
      `http://localhost:8080/api/notes/${updatedNote.id}`,
      updatedNote
    );
    // Mettre à jour la liste localement
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? res.data : note))
    );
  } catch (err) {
    console.error("Erreur lors de l'édition de la note", err);
    alert("Impossible de modifier la note");
  }
};


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold capitalize">{activePage}</h1>
          <button
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Déconnexion
          </button>
        </header>

        {/* Contenu selon la page */}
        <main className="p-6">
          {activePage === "notes" && <Notes notes={notes} onAddNote={onAddNote} onEditNote={onEditNote} onDeleteNote={onDeleteNote} userId={user.id} />}
          {activePage === "profile" && <Profile />}
        </main>
      </div>
    </div>
  );
}
