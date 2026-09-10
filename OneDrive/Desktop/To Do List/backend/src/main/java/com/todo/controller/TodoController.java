package com.todo.controller;

import com.todo.model.Todo;
import com.todo.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    // GET /api/todos
    @GetMapping
    public List<Todo> getAll() {
        return service.getAll();
    }

    // POST /api/todos   body: { "title": "..." }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@RequestBody Map<String, String> body) {
        String title = body.get("title");
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("Title cannot be empty");
        }
        return service.create(title.trim());
    }

    // PUT /api/todos/{id}   body: { "title": "...", "completed": true/false }
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id,
                       @RequestBody Map<String, Object> fields) {
        return service.update(id, fields);
    }

    // DELETE /api/todos/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    // DELETE /api/todos/completed  — clears all completed todos
    @DeleteMapping("/completed")
    public ResponseEntity<Map<String, Object>> deleteCompleted() {
        int count = service.deleteAllCompleted();
        return ResponseEntity.ok(Map.of("deleted", count));
    }

    // Global error handler
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", ex.getMessage()));
    }
}
