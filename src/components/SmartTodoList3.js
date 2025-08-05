import React, { useState, useEffect } from 'react';

function SmartTodoList3() {
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

  // ========================================
  // STEP 3: TOGGLE AND DELETE FUNCTIONS
  // ========================================
  
  // JavaScript Concept: Array.map() for updating specific items
  // React Concept: Immutable updates - creating new array instead of mutating
  const toggleTodo = (todoId) => {
    console.log("=== TOGGLE TODO ===");
    console.log("Toggling todo with ID:", todoId);
    console.log("Current todos before toggle:", todos);
    
    setTodos(prevTodos => {
      // JavaScript Concept: Array.map() creates new array with transformed items
      const updatedTodos = prevTodos.map(todo => {
        console.log("Checking todo:", todo);
        
        // JavaScript Concept: Conditional object spreading
        if (todo.id === todoId) {
          const toggledTodo = { ...todo, completed: !todo.completed };
          console.log("✅ Found target todo, toggling from", todo.completed, "to", toggledTodo.completed);
          return toggledTodo;
        }
        
        // JavaScript Concept: Return unchanged items as-is
        console.log("⏭️ Todo not target, keeping unchanged");
        return todo;
      });
      
      console.log("Updated todos after toggle:", updatedTodos);
      return updatedTodos;
    });
  };
  
  // JavaScript Concept: Array.filter() for removing items
  // React Concept: State updates with filtered arrays
  const deleteTodo = (todoId) => {
    console.log("=== DELETE TODO ===");
    console.log("Deleting todo with ID:", todoId);
    console.log("Current todos before delete:", todos);
    
    // JavaScript Concept: Confirmation dialog for destructive actions
    const todoToDelete = todos.find(todo => todo.id === todoId);
    console.log("Todo to delete:", todoToDelete);
    
    if (window.confirm(`Are you sure you want to delete "${todoToDelete.text}"?`)) {
      setTodos(prevTodos => {
        // JavaScript Concept: Array.filter() creates new array excluding items
        const updatedTodos = prevTodos.filter(todo => {
          const shouldKeep = todo.id !== todoId;
          console.log(`Todo "${todo.text}" (ID: ${todo.id}):`, shouldKeep ? "KEEP" : "DELETE");
          return shouldKeep;
        });
        
        console.log("Updated todos after delete:", updatedTodos);
        return updatedTodos;
      });
    } else {
      console.log("Delete cancelled by user");
    }
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

      {/* ========================================
          STEP 3: INTERACTIVE TODO LIST
          ======================================== */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📝 Todos ({todos.length} total):</h3>
        {todos.length === 0 ? (
          // React Concept: Conditional rendering for empty state
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#888',
            fontStyle: 'italic',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px dashed #ddd'
          }}>
            🎉 No todos yet! Add one above to get started.
          </div>
        ) : (
          // JavaScript Concept: Array.map() for rendering lists
          todos.map(todo => (
            <div 
              key={todo.id}  // React Concept: Key prop for efficient re-rendering
              style={{ 
                display: 'flex',
                alignItems: 'center',
                padding: '15px', 
                margin: '8px 0',
                backgroundColor: todo.completed ? '#e8f5e8' : '#fff',
                border: `2px solid ${todo.completed ? '#4CAF50' : '#ddd'}`,
                borderRadius: '8px',
                transition: 'all 0.3s ease'  // CSS: Smooth transitions
              }}
            >
              {/* Checkbox for toggle functionality */}
              <input
                type="checkbox"
                checked={todo.completed}  // React Concept: Controlled checkbox
                onChange={() => toggleTodo(todo.id)}  // JavaScript: Arrow function with closure
                style={{ 
                  marginRight: '12px',
                  transform: 'scale(1.2)'  // CSS: Make checkbox bigger
                }}
              />
              
              {/* Todo text with conditional styling */}
              <span style={{ 
                flex: 1,  // CSS: Take up remaining space
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#666' : '#000',
                fontSize: '16px',
                fontWeight: todo.completed ? 'normal' : '500'
              }}>
                {todo.text}
              </span>
              
              {/* Status badge */}
              <span style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: todo.completed ? '#4CAF50' : '#ff9800',
                color: 'white',
                marginRight: '10px'
              }}>
                {todo.completed ? '✅ Done' : '⏳ Active'}
              </span>
              
              {/* Delete button */}
              <button 
                onClick={() => deleteTodo(todo.id)}  // JavaScript: Arrow function to pass parameters
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#cc0000'}  // JavaScript: Inline hover effect
                onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ 
        fontSize: '12px', 
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: '10px', 
        borderRadius: '5px' 
      }}>
        <h4>🧠 What We've Built in Step 3:</h4>
        <ul style={{ textAlign: 'left', margin: 0 }}>
          <li><strong>Toggle functionality:</strong> Array.map() to update specific items immutably</li>
          <li><strong>Delete functionality:</strong> Array.filter() to remove items from arrays</li>
          <li><strong>Controlled checkboxes:</strong> Checkbox state controlled by React</li>
          <li><strong>Event delegation:</strong> Arrow functions to pass parameters to event handlers</li>
          <li><strong>Conditional rendering:</strong> Different UI for empty state vs populated list</li>
          <li><strong>Array.find():</strong> Finding specific items for operations</li>
          <li><strong>User confirmation:</strong> window.confirm() for destructive actions</li>
          <li><strong>Advanced styling:</strong> Dynamic styling based on todo state</li>
          <li><strong>Hover effects:</strong> Interactive button styling with mouse events</li>
        </ul>
        <p><strong>Try it:</strong> Toggle todos with checkboxes, delete with buttons!</p>
      </div>
    </div>
  );
}

export default SmartTodoList3;