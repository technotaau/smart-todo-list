import React, { useState, useEffect } from 'react';

function SmartTodoList2() {
  // ========================================
  // STEP 1: STATE SETUP (useState concepts)
  // ========================================
  
  // JavaScript Concept: Array of objects to store todo items
  // React Concept: useState to manage component state
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React hooks", completed: false, createdAt: new Date().toISOString() },
    { id: 2, text: "Build todo app", completed: false, createdAt: new Date().toISOString() }
  ]);
  
  // JavaScript Concept: String to store user input
  // React Concept: Controlled component pattern
  const [newTodoText, setNewTodoText] = useState("");
  
  // JavaScript Concept: String enumeration for filter states
  // React Concept: Conditional rendering based on state
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  
  // JavaScript Concept: Boolean for loading states
  // React Concept: Conditional rendering for UX feedback
  const [isLoading, setIsLoading] = useState(false);
  
  // JavaScript Concept: Object to store calculated data
  // React Concept: Derived state (calculated from other state)
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  // ========================================
  // STEP 2: EVENT HANDLERS (Function concepts)
  // ========================================
  
  // JavaScript Concept: Event handling and form submission
  // React Concept: Synthetic events and preventDefault
  const handleSubmit = (event) => {
    console.log("=== FORM SUBMITTED ===");
    console.log("Event object:", event);
    console.log("Form data before processing:", newTodoText);
    
    // JavaScript Concept: Preventing default browser behavior
    // Behind the scenes: Stops browser from refreshing page
    event.preventDefault();
    
    // JavaScript Concept: String methods and validation
    // React Concept: Input validation before state update
    const trimmedText = newTodoText.trim();
    
    if (trimmedText === "") {
      console.log("❌ Empty input detected, not adding todo");
      alert("Please enter a todo item!");
      return; // JavaScript: Early return pattern
    }
    
    console.log("✅ Valid input, proceeding to add todo...");
    
    // JavaScript Concept: Creating new objects and unique IDs
    // React Concept: State immutability - creating new state instead of mutating
    const newTodo = {
      id: Date.now(), // Simple ID generation using timestamp
      text: trimmedText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    console.log("New todo object created:", newTodo);
    
    // JavaScript Concept: Spread operator for array immutability
    // React Concept: setState with new array reference
    setTodos(prevTodos => {
      console.log("Previous todos:", prevTodos);
      const updatedTodos = [...prevTodos, newTodo];
      console.log("Updated todos:", updatedTodos);
      return updatedTodos;
    });
    
    // React Concept: Clearing controlled input after submission
    setNewTodoText("");
    console.log("Input cleared, newTodoText set to empty string");
  };
  
  // JavaScript Concept: Event handling for input changes
  // React Concept: Controlled components - React controls the input value
  const handleInputChange = (event) => {
    console.log("=== INPUT CHANGED ===");
    console.log("New input value:", event.target.value);
    console.log("Previous value:", newTodoText);
    
    // React Concept: Updating state triggers re-render
    setNewTodoText(event.target.value);
  };

  console.log("=== COMPONENT RENDER ===");
  console.log("Current todos:", todos);
  console.log("Filter:", filter);
  console.log("Statistics:", statistics);
  console.log("Input value:", newTodoText);

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      border: '2px solid #4CAF50',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>
        🚀 Smart Todo List
      </h1>
      
      {/* ========================================
          STEP 2: FORM FOR ADDING NEW TODOS
          ======================================== */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          alignItems: 'center',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #4CAF50'
        }}>
          {/* React Concept: Controlled input - value and onChange */}
          <input
            type="text"
            value={newTodoText}  // React controls this value
            onChange={handleInputChange}  // React updates state on every keystroke
            placeholder="Enter a new todo item..."
            style={{
              flex: 1,  // CSS: Take up remaining space
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          
          {/* React Concept: Button type="submit" triggers form onSubmit */}
          <button 
            type="submit"
            disabled={newTodoText.trim() === ""}  // JavaScript: Disable if empty
            style={{
              padding: '10px 20px',
              backgroundColor: newTodoText.trim() === "" ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: newTodoText.trim() === "" ? 'not-allowed' : 'pointer'
            }}
          >
            ➕ Add Todo
          </button>
        </div>
        
        {/* Debug info for form state */}
        <div style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '5px',
          fontStyle: 'italic'
        }}>
          Form State: Input="{newTodoText}" | Length={newTodoText.length} | Valid={newTodoText.trim() !== ""}
        </div>
      </form>
      
      {/* Step 1: Basic display of current state */}
      <div style={{ 
        backgroundColor: '#f0f8ff', 
        padding: '15px', 
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <h3>📊 Current State (Debug View)</h3>
        <p><strong>Total Todos:</strong> {todos.length}</p>
        <p><strong>New Todo Text:</strong> "{newTodoText}"</p>
        <p><strong>Current Filter:</strong> {filter}</p>
        <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
      </div>

      {/* Step 1: Basic todo display */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📝 Todos:</h3>
        {todos.map(todo => (
          <div 
            key={todo.id} 
            style={{ 
              padding: '10px', 
              margin: '5px 0',
              backgroundColor: todo.completed ? '#e8f5e8' : '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#666' : '#000'
            }}>
              {todo.text}
            </span>
            <small style={{ marginLeft: '10px', color: '#888' }}>
              (ID: {todo.id}, Status: {todo.completed ? 'Done' : 'Active'})
            </small>
          </div>
        ))}
      </div>

      <div style={{ 
        fontSize: '12px', 
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: '10px', 
        borderRadius: '5px' 
      }}>
        <h4>🧠 What We've Built in Step 2:</h4>
        <ul style={{ textAlign: 'left', margin: 0 }}>
          <li><strong>Form handling:</strong> onSubmit with preventDefault to stop page refresh</li>
          <li><strong>Controlled input:</strong> Input value controlled by React state</li>
          <li><strong>Event handling:</strong> onChange to update state on every keystroke</li>
          <li><strong>Input validation:</strong> Trim whitespace and check for empty input</li>
          <li><strong>State immutability:</strong> Using spread operator to create new arrays</li>
          <li><strong>Unique ID generation:</strong> Using Date.now() for simple IDs</li>
          <li><strong>Conditional styling:</strong> Button changes based on input validity</li>
          <li><strong>Form reset:</strong> Clear input after successful submission</li>
        </ul>
        <p><strong>Try it:</strong> Type in the input and press Enter or click Add Todo!</p>
      </div>
    </div>
  );
}

export default SmartTodoList2;