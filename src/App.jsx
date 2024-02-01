import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

// In React, you can only return a single element from a component
// Will get errors if trying to return the form along with the h1
// Use a fragment ( essentially an empty tag <></> ) to return multiple elements
// Note that hooks can only be called at the top level of a functional component - cannot be called in conditional statements or loops
export default function App() {
  // useState is a hook inside of React that allows you to add state to a functional component
  // Returns an array with two elements - first is the state, second is a function to update the state
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    // Must pass a function to setTodos to ensure that the current state/current value is used
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo; // If current id does not match, just return as-is with no changes
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // In React, onChange is called every single time a key is pressed, which updates the state on line 10
  // e.target.value is the value of the input and allow newItem to be updated rather than being a constant empty string
  // When you change a state variable, it always re-renders the component
  // Curly braces are used to embed JavaScript expressions into JSX
  // Each element in a list must have a unique key prop
  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">To-Do List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
