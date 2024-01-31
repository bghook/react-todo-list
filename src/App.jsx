import { useState } from "react";
import "./styles.css";

// In React, you can only return a single element from a component
// Will get errors if trying to return the form along with the h1
// Use a fragment ( essentially an empty tag <></> ) to return multiple elements
export default function App() {
  // useState is a hook inside of React that allows you to add state to a functional component
  // Returns an array with two elements - first is the state, second is a function to update the state
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]); // Default value is an empty array for todos

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevents page from refreshing

    // Must pass a function to setTodos to ensure that the current state/current value is used
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false },
      ];
    });
  }

  // Line 21 - in React, onChange is called every single time a key is pressed, which updates the state on line 10
  // Line 21 - e.target.value is the value of the input and allow newItem to be updated rather than being a constant empty string
  // Line 21 - when you change a state variable, it always re-renders the component
  return (
    <>
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
      <h1 className="header">To-Do List</h1>
      <ul className="list">
        <li>
          <label>
            <input type="checkbox" />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul>
    </>
  );
}
