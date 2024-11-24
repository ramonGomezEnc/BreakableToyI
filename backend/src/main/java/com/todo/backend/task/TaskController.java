package com.todo.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    private final TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestParam(required = false) String nameFilter,
            @RequestParam(required = false) String priorityFilter,
            @RequestParam(required = false) Boolean isCompletedFilter,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) Boolean isDescending,
            @RequestParam(defaultValue = "0") int page) {
        List<Task> tasks = service.getTasks(nameFilter, priorityFilter, isCompletedFilter, sortBy, isDescending, page);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
}
