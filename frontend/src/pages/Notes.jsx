import React, { useState } from "react";

export default function Notes({ notes, onAddNote, onEditNote, onDeleteNote, userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  // Ouvrir modal ajout
  const openAddModal = () => {
    setEditingNote(null);
    setTitle("");
    setDescription("");
    setIsModalOpen(true);
  };

  // Sauvegarder note (ajout ou édition)
  const handleSaveNote = () => {
    if (!title || !description) {
      alert("Remplis tous les champs !");
      return;
    }

    if (editingNote) {
      onEditNote({ ...editingNote, titre: title, description });
    } else {
      onAddNote({ titre: title, description, createdAt: new Date(), userId });
    }

    setEditingNote(null);
    setTitle("");
    setDescription("");
    setIsModalOpen(false);
  };

  // Ouvrir modal édition
  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.titre);
    setDescription(note.description);
    setIsModalOpen(true);
  };

  // Ouvrir modal suppression
  const openDeleteModal = (id) => {
    setDeleteNoteId(id);
  };

  // Confirmer suppression
  const confirmDelete = () => {
    onDeleteNote(deleteNoteId);
    setDeleteNoteId(null);
  };

  // Annuler suppression
  const cancelDelete = () => {
    setDeleteNoteId(null);
  };

  return (
    <div className="flex flex-col">
      {/* Bouton Ajouter */}
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Ajouter une note
        </button>
      </div>

      {/* Modal ajout/édition */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {editingNote ? "Éditer la note" : "Nouvelle note"}
            </h2>
            <input
              type="text"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveNote}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                {editingNote ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal suppression */}
      {deleteNoteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirmer la suppression</h2>
            <p className="mb-6">Voulez-vous vraiment supprimer cette note ?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Liste des notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes && notes.length > 0 ? (
          notes.map((note, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg relative"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {note.titre || "Sans titre"}
              </h2>
              <p className="text-gray-600 h-72 W-72 overflow-auto">{note.description || "Aucune description"}</p>
              <p className="mt-3 text-sm text-gray-400">
                Créé le: {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(note)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm"
                >
                  Éditer
                </button>
                <button
                  onClick={() => openDeleteModal(note.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">Aucune note disponible</p>
        )}
      </div>
    </div>
  );
}
