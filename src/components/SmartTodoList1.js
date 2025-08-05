import React, { useState, useEffect } from 'react';

function SmartTodoList1() {
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

  console.log("=== COMPONENT RENDER ===");
  console.log("Current todos:", todos);
  console.log("Filter:", filter);
  console.log("Statistics:", statistics);

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
        <h4>🧠 What We've Built So Far:</h4>
        <ul style={{ textAlign: 'left', margin: 0 }}>
          <li><strong>useState for todos:</strong> Array of objects with id, text, completed, createdAt</li>
          <li><strong>useState for newTodoText:</strong> String for user input</li>
          <li><strong>useState for filter:</strong> String enum for filtering options</li>
          <li><strong>useState for loading:</strong> Boolean for UX feedback</li>
          <li><strong>useState for statistics:</strong> Object for calculated data</li>
          <li><strong>Basic rendering:</strong> Displaying state with conditional styling</li>
        </ul>
      </div>
    </div>
  );
}

export default SmartTodoList1;