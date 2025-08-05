import React from 'react';
import SmartTodoList from './components/SmartTodoList';
import './App.css';
import SmartTodoList1 from './components/SmartTodoList1';
import SmartTodoList2 from './components/SmartTodoList2';
import SmartTodoList3 from './components/SmartTodoList3';
import SmartTodoList4 from './components/SmartTodoList4';

function App() {
  return (
    <div className="App">
      {/* Optional: Add a simple header */}
      <header style={{
        backgroundColor: '#282c34',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1>React Hooks Demo</h1>
        <p>Smart Todo List - Built with useState & useEffect</p>
      </header>

      {/* Main application component */}
      <SmartTodoList />
      
      {/* Optional: Add footer with tech info */}
      <footer style={{
        textAlign: 'center',
        padding: '20px',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #eee',
        marginTop: '40px'
      }}>
        <p>
          Built with: <strong>React Hooks</strong> (useState + useEffect) | 
          Features: <strong>Data Persistence</strong>, <strong>Real-time Stats</strong>, <strong>Inline Editing</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;