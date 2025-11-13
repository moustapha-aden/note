// Sidebar.js
import React from "react";
import { FaStickyNote, FaUser } from "react-icons/fa";

export default function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "notes", label: "Notes", icon: <FaStickyNote /> },
    { name: "profile", label: "Profil", icon: <FaUser /> },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col min-h-screen">
      <div className="text-2xl font-bold p-6 border-b border-gray-700">
        Mon Dashboard
      </div>
      <nav className="flex-1 p-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            className={`flex items-center w-full mb-3 p-3 rounded-lg text-left transition-colors duration-200
              ${activePage === item.name ? "bg-blue-600 text-white" : "hover:bg-gray-700"}`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
