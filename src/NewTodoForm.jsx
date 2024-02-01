import { useState } from "react";

// Note: onSubmit is a prop that is passed to the NewTodoForm component from App.jsx
export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page from refreshing
    if (newItem === "") return; // If newItem is empty, return (do nothing)

    onSubmit(newItem); // Pass the new item to the addTodo function in App.jsx

    setNewItem(""); // Clear the input field after adding a new item
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
