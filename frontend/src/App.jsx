import { Routes, Route, Navigate } from 'react-router-dom';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Task Master</h1>
        <p style={{ color: 'var(--text-muted)' }}>Organize your life, one task at a time.</p>
      </header>

      <main className="glass-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks/all" replace />} />
          <Route path="/tasks/:filter" element={<TaskManager />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
