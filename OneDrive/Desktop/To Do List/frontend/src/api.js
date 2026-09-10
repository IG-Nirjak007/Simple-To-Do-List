const BASE = 'http://localhost:8080/api/todos';

export const fetchTodos = () =>
  fetch(BASE).then(r => {
    if (!r.ok) throw new Error('Failed to fetch todos');
    return r.json();
  });

export const createTodo = (title) =>
  fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  }).then(r => {
    if (!r.ok) throw new Error('Failed to create todo');
    return r.json();
  });

export const updateTodo = (id, fields) =>
  fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  }).then(r => {
    if (!r.ok) throw new Error('Failed to update todo');
    return r.json();
  });

export const deleteTodo = (id) =>
  fetch(`${BASE}/${id}`, { method: 'DELETE' }).then(r => {
    if (!r.ok) throw new Error('Failed to delete todo');
  });

export const deleteAllCompleted = () =>
  fetch(`${BASE}/completed`, { method: 'DELETE' }).then(r => {
    if (!r.ok) throw new Error('Failed to clear completed todos');
    return r.json();
  });
