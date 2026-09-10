import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editVal, setEditVal] = useState(todo.title);

  const saveEdit = async () => {
    const trimmed = editVal.trim();
    if (trimmed && trimmed !== todo.title) {
      await onEdit(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') { setEditVal(todo.title); setEditing(false); }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`} id={`todo-item-${todo.id}`}>
      <input
        id={`todo-check-${todo.id}`}
        className="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
      />

      {editing ? (
        <input
          id={`todo-edit-input-${todo.id}`}
          className="todo-edit-input"
          autoFocus
          value={editVal}
          onChange={(e) => setEditVal(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          maxLength={200}
        />
      ) : (
        <span
          className="todo-title"
          onDoubleClick={() => !todo.completed && setEditing(true)}
          title="Double-click to edit"
        >
          {todo.title}
        </span>
      )}

      <div className="todo-actions">
        {!todo.completed && !editing && (
          <button
            id={`todo-edit-btn-${todo.id}`}
            className="btn-icon"
            onClick={() => setEditing(true)}
            title="Edit"
          >
            edit
          </button>
        )}
        {editing && (
          <button
            id={`todo-save-btn-${todo.id}`}
            className="btn-icon save"
            onClick={saveEdit}
            title="Save"
          >
            save
          </button>
        )}
        <button
          id={`todo-delete-btn-${todo.id}`}
          className="btn-icon delete"
          onClick={() => onDelete(todo.id)}
          title="Delete"
        >
          delete
        </button>
      </div>
    </li>
  );
}

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
  const visible = todos.filter((t) => {
    if (filter === 'active')    return !t.completed;
    if (filter === 'completed') return  t.completed;
    return true;
  });

  if (visible.length === 0) {
    return (
      <div className="empty-state">
        {filter === 'completed'
          ? 'No completed tasks.'
          : filter === 'active'
          ? 'All done.'
          : 'No tasks yet.'}
      </div>
    );
  }

  return (
    <ul className="todo-list" id="todo-list">
      {visible.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
