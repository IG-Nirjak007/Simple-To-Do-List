package com.todo.service;

import com.todo.model.Todo;
import com.todo.repository.TodoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
public class TodoService {

    private final TodoRepository repo;

    public TodoService(TodoRepository repo) {
        this.repo = repo;
    }

    /** Return all todos ordered by creation date descending */
    public List<Todo> getAll() {
        return repo.findAll()
                .stream()
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .toList();
    }

    /** Create a new todo */
    public Todo create(String title) {
        Todo todo = new Todo(title);
        return repo.save(todo);
    }

    /** Update title and/or completed flag */
    public Todo update(Long id, Map<String, Object> fields) {
        Todo todo = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found: " + id));

        if (fields.containsKey("title")) {
            String title = (String) fields.get("title");
            if (title != null && !title.isBlank()) {
                todo.setTitle(title.trim());
            }
        }
        if (fields.containsKey("completed")) {
            todo.setCompleted((Boolean) fields.get("completed"));
        }

        return repo.save(todo);
    }

    /** Delete a todo by id */
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Todo not found: " + id);
        }
        repo.deleteById(id);
    }

    /** Delete all completed todos */
    @Transactional
    public int deleteAllCompleted() {
        List<Todo> completed = repo.findAll()
                .stream()
                .filter(Todo::isCompleted)
                .toList();
        repo.deleteAll(completed);
        return completed.size();
    }
}
