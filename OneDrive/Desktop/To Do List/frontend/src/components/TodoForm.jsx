import { useState } from 'react';

export default function TodoForm({ onAdd, loading }) {
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit} id="todo-add-form">
      <input
        id="todo-input"
        className="todo-input"
        type="text"
        placeholder="Add a task…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        autoFocus
        autoComplete="off"
      />
      <button
        id="todo-add-btn"
        className="btn-primary"
        type="submit"
        disabled={loading || !value.trim()}
      >
        Add
      </button>
    </form>
  );
}
