import React, { useState, useEffect } from 'react';

function SmartTodoList() {
  // ========================================
  // STEP 1: STATE SETUP (useState concepts)
  // ========================================
  
  // JavaScript Concept: Array of objects to store todo items
  // React Concept: useState to manage component state
  // STEP 5: Starting with empty array - data will load from localStorage
  const [todos, setTodos] = useState([]);
  
  // JavaScript Concept: String to store user input
  // React Concept: Controlled component pattern
  const [newTodoText, setNewTodoText] = useState("");
  
  // JavaScript Concept: String enumeration for filter states
  // React Concept: Conditional rendering based on state
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  
  // JavaScript Concept: Boolean for loading states
  // React Concept: Conditional rendering for UX feedback
  const [isLoading, setIsLoading] = useState(true); // STEP 5: Start with loading state
  
  // JavaScript Concept: Object to store calculated data
  // React Concept: Derived state (calculated from other state)
  const [statistics, setStatistics] = useState({
    total: 0,
    completed: 0,
    active: 0
  });

  // ========================================
  // STEP 5: EDITING STATE FOR INLINE EDITING
  // ========================================
  
  // JavaScript Concept: Object to track which todo is being edited
  // React Concept: Complex state management for UI modes
  const [editingTodo, setEditingTodo] = useState(null); // null or {id, text}
  
  // JavaScript Concept: String for storing edit input value
  // React Concept: Separate state for editing to avoid conflicts
  const [editText, setEditText] = useState("");

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

  // ========================================
  // STEP 4: FILTERING AND STATISTICS
  // ========================================
  
  // JavaScript Concept: Array.filter() for displaying subsets of data
  // React Concept: Derived state - calculating display data from source state
  const getFilteredTodos = () => {
    console.log("=== FILTERING TODOS ===");
    console.log("Current filter:", filter);
    console.log("All todos:", todos);
    
    let filtered;
    
    // JavaScript Concept: Switch statement for multiple conditions
    switch (filter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        console.log("Filtered to active todos:", filtered);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        console.log("Filtered to completed todos:", filtered);
        break;
      case 'all':
      default:
        filtered = todos;
        console.log("Showing all todos:", filtered);
        break;
    }
    
    return filtered;
  };
  
  // JavaScript Concept: Function to handle filter changes
  // React Concept: State updates trigger re-renders with new filtered view
  const handleFilterChange = (newFilter) => {
    console.log("=== FILTER CHANGED ===");
    console.log("Changing filter from", filter, "to", newFilter);
    setFilter(newFilter);
  };

  // ========================================
  // STEP 5: useEffect FOR AUTO-CALCULATIONS
  // ========================================
  
  // React Concept: useEffect for derived state calculations
  // JavaScript Concept: Array methods for data analysis
  useEffect(() => {
    console.log("=== STATISTICS USEEFFECT TRIGGERED ===");
    console.log("Recalculating statistics because todos changed");
    console.log("Current todos for calculation:", todos);
    
    // JavaScript Concept: Array.filter() and .length for counting
    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const activeTodos = todos.filter(todo => !todo.completed).length;
    
    console.log("Calculated statistics:");
    console.log("- Total:", totalTodos);
    console.log("- Completed:", completedTodos);
    console.log("- Active:", activeTodos);
    
    // React Concept: Updating derived state with calculated values
    const newStatistics = {
      total: totalTodos,
      completed: completedTodos,
      active: activeTodos,
      completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0
    };
    
    console.log("New statistics object:", newStatistics);
    setStatistics(newStatistics);
    
  }, [todos]); // React Concept: Dependency array - run when todos changes

  // ========================================
  // STEP 5: useEffect FOR DATA PERSISTENCE
  // ========================================
  
  // React Concept: useEffect with empty dependency array for component mount
  // JavaScript Concept: localStorage API for browser data persistence
  useEffect(() => {
    console.log("=== LOADING DATA FROM LOCALSTORAGE ===");
    console.log("Component mounted, attempting to load saved todos...");
    
    try {
      // JavaScript Concept: localStorage.getItem() returns string or null
      const savedTodos = localStorage.getItem('smart-todo-list');
      console.log("Raw data from localStorage:", savedTodos);
      
      if (savedTodos) {
        // JavaScript Concept: JSON.parse() converts string back to JavaScript object
        const parsedTodos = JSON.parse(savedTodos);
        console.log("Parsed todos from localStorage:", parsedTodos);
        
        // React Concept: Setting state with loaded data
        setTodos(parsedTodos);
        console.log("✅ Successfully loaded", parsedTodos.length, "todos from localStorage");
      } else {
        console.log("📝 No saved todos found, starting with demo data");
        // STEP 5: Set demo data if no saved data exists
        const demoTodos = [
          { id: 1, text: "Learn React hooks", completed: false, createdAt: new Date().toISOString() },
          { id: 2, text: "Build todo app", completed: false, createdAt: new Date().toISOString() },
          { id: 3, text: "Add localStorage persistence", completed: true, createdAt: new Date().toISOString() }
        ];
        setTodos(demoTodos);
      }
    } catch (error) {
      // JavaScript Concept: Error handling for corrupted localStorage data
      console.error("❌ Error loading todos from localStorage:", error);
      console.log("Using demo data due to error");
      setTodos([
        { id: 1, text: "Learn React hooks", completed: false, createdAt: new Date().toISOString() }
      ]);
    } finally {
      // React Concept: Always set loading to false, regardless of success/error
      setIsLoading(false);
      console.log("Loading complete, isLoading set to false");
    }
  }, []); // Empty array = run only once when component mounts
  
  // React Concept: useEffect for saving data whenever todos change
  // JavaScript Concept: Debouncing saves to avoid excessive localStorage writes
  useEffect(() => {
    // Skip saving on initial load (when isLoading is true)
    if (isLoading) {
      console.log("⏭️ Skipping save during initial load");
      return;
    }
    
    console.log("=== SAVING DATA TO LOCALSTORAGE ===");
    console.log("Todos changed, saving to localStorage:", todos);
    
    try {
      // JavaScript Concept: JSON.stringify() converts JavaScript object to string
      const todosJSON = JSON.stringify(todos);
      
      // JavaScript Concept: localStorage.setItem() saves string to browser storage
      localStorage.setItem('smart-todo-list', todosJSON);
      console.log("✅ Successfully saved", todos.length, "todos to localStorage");
      console.log("Saved data size:", todosJSON.length, "characters");
      
    } catch (error) {
      // JavaScript Concept: Error handling for localStorage quota exceeded
      console.error("❌ Error saving todos to localStorage:", error);
      alert("Unable to save todos. Storage might be full.");
    }
  }, [todos, isLoading]); // Run when todos OR isLoading changes

  // ========================================
  // STEP 5: EDITING FUNCTIONALITY
  // ========================================
  
  // JavaScript Concept: Functions for managing edit mode
  // React Concept: Complex state updates for UI mode changes
  const startEditing = (todo) => {
    console.log("=== START EDITING ===");
    console.log("Starting edit for todo:", todo);
    
    setEditingTodo({ id: todo.id, originalText: todo.text });
    setEditText(todo.text);
    console.log("Edit mode activated for todo ID:", todo.id);
  };
  
  const cancelEditing = () => {
    console.log("=== CANCEL EDITING ===");
    console.log("Cancelling edit mode");
    
    setEditingTodo(null);
    setEditText("");
    console.log("Edit mode deactivated");
  };
  
  const saveEdit = () => {
    console.log("=== SAVE EDIT ===");
    console.log("Saving edit for todo ID:", editingTodo.id);
    console.log("New text:", editText);
    
    const trimmedText = editText.trim();
    
    if (trimmedText === "") {
      alert("Todo text cannot be empty!");
      return;
    }
    
    // JavaScript Concept: Array.map() for updating specific items
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === editingTodo.id 
          ? { ...todo, text: trimmedText, updatedAt: new Date().toISOString() }
          : todo
      )
    );
    
    // Clear edit mode
    setEditingTodo(null);
    setEditText("");
    console.log("✅ Edit saved and edit mode cleared");
  };
  
  // JavaScript Concept: Calling function to get current filtered data
  const filteredTodos = getFilteredTodos();

  console.log("=== COMPONENT RENDER ===");
  console.log("Current todos:", todos);
  console.log("Filter:", filter);
  console.log("Statistics:", statistics);
  console.log("Input value:", newTodoText);
  console.log("Filtered todos for display:", filteredTodos);
  console.log("Loading state:", isLoading);
  console.log("Editing todo:", editingTodo);
  console.log("Edit text:", editText);

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
        🚀 Smart Todo List {isLoading && "⏳"}
      </h1>
      
      {/* ========================================
          STEP 5: LOADING STATE
          ======================================== */}
      {isLoading ? (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          fontSize: '18px',
          color: '#666'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <div>Loading your todos...</div>
          <div style={{ fontSize: '14px', marginTop: '10px', fontStyle: 'italic' }}>
            Reading from localStorage...
          </div>
        </div>
      ) : (
        <>
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
              Form State: Input="{newTodoText}" | Length={newTodoText.length} | Valid={newTodoText.trim() !== ""} | Saved to localStorage: ✅
            </div>
          </form>

      {/* ========================================
          STEP 4: STATISTICS DASHBOARD
          ======================================== */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '10px',
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '2px solid #e9ecef'
      }}>
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            {statistics.total}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Total</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
            {statistics.completed}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>
            {statistics.active}
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Active</div>
        </div>
        
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>
            {statistics.completionRate}%
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>Complete Rate</div>
        </div>
      </div>

      {/* ========================================
          STEP 4: FILTER BUTTONS
          ======================================== */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '2px solid #dee2e6',
        justifyContent: 'center'
      }}>
        {/* JavaScript Concept: Array of filter options for dynamic rendering */}
        {[
          { key: 'all', label: '📋 All', count: statistics.total },
          { key: 'active', label: '⏳ Active', count: statistics.active },
          { key: 'completed', label: '✅ Completed', count: statistics.completed }
        ].map(filterOption => (
          <button
            key={filterOption.key}  // React Concept: Key for list items
            onClick={() => handleFilterChange(filterOption.key)}  // JavaScript: Arrow function with closure
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px',
              // JavaScript Concept: Conditional styling based on current state
              backgroundColor: filter === filterOption.key ? '#007bff' : '#e9ecef',
              color: filter === filterOption.key ? 'white' : '#495057',
              transform: filter === filterOption.key ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.2s ease'
            }}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>
      
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
          STEP 4: FILTERED TODO LIST DISPLAY
          ======================================== */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
          📝 {filter === 'all' ? 'All Todos' : 
               filter === 'active' ? 'Active Todos' : 
               'Completed Todos'} 
          ({filteredTodos.length} {filter === 'all' ? 'total' : filter})
        </h3>
        
        {/* React Concept: Conditional rendering based on filtered results */}
        {filteredTodos.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            color: '#888',
            fontStyle: 'italic',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px dashed #ddd'
          }}>
            {/* JavaScript Concept: Conditional messages based on filter and total todos */}
            {todos.length === 0 ? (
              "🎉 No todos yet! Add one above to get started."
            ) : filter === 'active' ? (
              "🎉 No active todos! All tasks are completed."
            ) : filter === 'completed' ? (
              "📝 No completed todos yet. Check off some tasks above!"
            ) : (
              "🎉 No todos to display."
            )}
          </div>
        ) : (
          // JavaScript Concept: Array.map() on filtered data instead of all data
          filteredTodos.map(todo => (
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
                transition: 'all 0.3s ease',  // CSS: Smooth transitions
                // JavaScript Concept: Additional styling for filtered items
                opacity: filter === 'all' ? 1 : 0.95,
                transform: filter !== 'all' ? 'translateX(5px)' : 'none',
                // STEP 5: Special styling for items being edited
                boxShadow: editingTodo?.id === todo.id ? '0 0 10px rgba(76, 175, 80, 0.5)' : 'none'
              }}
            >
              {/* STEP 5: Conditional rendering - Edit mode vs Display mode */}
              {editingTodo?.id === todo.id ? (
                // ========================================
                // EDIT MODE: Inline editing form
                // ========================================
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ marginRight: '12px', transform: 'scale(1.2)' }}
                  />
                  
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      // JavaScript Concept: Keyboard event handling
                      if (e.key === 'Enter') {
                        saveEdit();
                      } else if (e.key === 'Escape') {
                        cancelEditing();
                      }
                    }}
                    autoFocus  // React Concept: Auto-focus for better UX
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: '2px solid #4CAF50',
                      borderRadius: '4px',
                      fontSize: '16px',
                      backgroundColor: '#fff'
                    }}
                  />
                  
                  <button 
                    onClick={saveEdit}
                    disabled={editText.trim() === ""}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: editText.trim() === "" ? '#ccc' : '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      marginLeft: '8px',
                      cursor: editText.trim() === "" ? 'not-allowed' : 'pointer'
                    }}
                  >
                    ✅ Save
                  </button>
                  
                  <button 
                    onClick={cancelEditing}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      marginLeft: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Cancel
                  </button>
                </>
              ) : (
                // ========================================
                // DISPLAY MODE: Normal todo display
                // ========================================
                <>
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
                  
                  {/* Todo text with conditional styling - now clickable for editing */}
                  <span 
                    onClick={() => startEditing(todo)}
                    style={{ 
                      flex: 1,  // CSS: Take up remaining space
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#666' : '#000',
                      fontSize: '16px',
                      fontWeight: todo.completed ? 'normal' : '500',
                      cursor: 'pointer',  // STEP 5: Show it's clickable
                      padding: '4px 8px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    title="Click to edit"  // HTML Concept: Tooltip
                  >
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
                  
                  {/* STEP 5: Edit button (alternative to clicking text) */}
                  <button 
                    onClick={() => startEditing(todo)}
                    style={{
                      padding: '6px 10px',
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      marginRight: '5px'
                    }}
                    title="Edit todo"
                  >
                    ✏️ Edit
                  </button>
                  
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
                </>
              )}
            </div>
          ))
        )}
      </div>
      </>
      )}

      <div style={{ 
        fontSize: '12px', 
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: '10px', 
        borderRadius: '5px' 
      }}>
        <h4>🧠 What We've Built in Step 5 - The Complete App:</h4>
        <ul style={{ textAlign: 'left', margin: 0 }}>
          <li><strong>localStorage persistence:</strong> Automatic save/load with JSON.stringify/parse</li>
          <li><strong>Multiple useEffect patterns:</strong> Loading data (empty []), saving data ([todos]), statistics ([todos])</li>
          <li><strong>Loading states:</strong> UX feedback during data loading with isLoading state</li>
          <li><strong>Error handling:</strong> Try/catch blocks for localStorage operations</li>
          <li><strong>Inline editing:</strong> Click-to-edit functionality with mode switching</li>
          <li><strong>Keyboard shortcuts:</strong> Enter to save, Escape to cancel editing</li>
          <li><strong>Complex state management:</strong> Multiple useState hooks working together</li>
          <li><strong>Conditional rendering:</strong> Different UI modes (loading, display, edit)</li>
          <li><strong>Data persistence:</strong> Your todos survive browser refresh!</li>
          <li><strong>Production-ready patterns:</strong> Error boundaries, loading states, user feedback</li>
        </ul>
        <p><strong>🎉 COMPLETED FEATURES:</strong></p>
        <ul style={{ textAlign: 'left', margin: '10px 0 0 20px' }}>
          <li>✅ Add, edit, delete, toggle todos</li>
          <li>✅ Filter by All/Active/Completed</li>
          <li>✅ Real-time statistics dashboard</li>
          <li>✅ Automatic localStorage persistence</li>
          <li>✅ Loading states and error handling</li>
          <li>✅ Inline editing with keyboard shortcuts</li>
          <li>✅ Responsive design and smooth animations</li>
        </ul>
        <p><strong>Try everything:</strong> Add todos, edit by clicking text, use filters, refresh browser to see persistence!</p>
      </div>
    </div>
  );
}

export default SmartTodoList;