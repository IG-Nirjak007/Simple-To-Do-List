import { useState, useEffect } from 'react';
import './index.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo, deleteAllCompleted } from './api';

const FILTERS = ['all', 'active', 'completed'];

export default function App() {
  const [todos,   setTodos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [filter,  setFilter]  = useState('all');

  useEffect(() => {
    fetchTodos()
      .then(setTodos)
      .catch(() => setError('Could not connect to the server. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const clearError = () => setError(null);

  const handleAdd = async (title) => {
    clearError();
    try {
      const newTodo = await createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch {
      setError('Failed to add todo.');
    }
  };

  const handleToggle = async (id, currentCompleted) => {
    clearError();
    try {
      const updated = await updateTodo(id, { completed: !currentCompleted });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to update todo.');
    }
  };

  const handleEdit = async (id, newTitle) => {
    clearError();
    try {
      const updated = await updateTodo(id, { title: newTitle });
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch {
      setError('Failed to edit todo.');
    }
  };

  const handleDelete = async (id) => {
    clearError();
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError('Failed to delete todo.');
    }
  };

  const handleClearCompleted = async () => {
    clearError();
    try {
      await deleteAllCompleted();
      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch {
      setError('Failed to clear completed todos.');
    }
  };

  const total     = todos.length;
  const done      = todos.filter((t) => t.completed).length;
  const remaining = total - done;

  return (
    <div id="app">
      <header className="app-header">
        <h1>To-Do</h1>
        <p>Things to get done</p>
      </header>

      <TodoForm onAdd={handleAdd} loading={loading} />

      {error && <div className="error-bar" role="alert">{error}</div>}

      <div className="filter-bar" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
            role="tab"
            aria-selected={filter === f}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {total > 0 && (
        <div className="stats-bar">
          <span><span className="count">{remaining}</span> remaining</span>
          <span>
            <span className="count">{done}</span> done
            {done > 0 && (
              <button
                id="clear-completed-btn"
                className="btn-clear"
                onClick={handleClearCompleted}
              >
                clear
              </button>
            )}
          </span>
        </div>
      )}

      {loading ? (
        <div className="loader">
          <span className="spinner" />loading…
        </div>
      ) : (
        <TodoList
          todos={todos}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
