package com.todo.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
public class TaskController {
    private final TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<TaskResponse> getAllTasks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean isCompleted,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order,
            @RequestParam(defaultValue = "0") int page) {
        return new ResponseEntity<>(service.getTasks(name, priority, isCompleted, sortBy, order, page), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task payload) {
        return new ResponseEntity<>(service.createTask(payload), HttpStatus.CREATED);
    }

    // Only for testing
    @PostMapping("/list")
    public ResponseEntity<List<Task>> createTasks(@RequestBody List<Task> tasks) {
        List<Task> createdTasks = service.createTasks(tasks);
        return new ResponseEntity<>(createdTasks, HttpStatus.CREATED);
    }


    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task payload) {
        return new ResponseEntity<>(service.updateTaskContent(taskId, payload), HttpStatus.OK);
    }

    @PatchMapping("/{taskId}/{status}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long taskId, @PathVariable String status) {
        return new ResponseEntity<>(service.updateTaskStatus(taskId, status), HttpStatus.OK);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        return new ResponseEntity<>(service.deleteTask(taskId), HttpStatus.OK);
    }

    @GetMapping("/averageTime")
    public ResponseEntity<String> getAverageTime() {
        String averageTime = service.calculateAverageTime();
        return new ResponseEntity<>(averageTime, HttpStatus.OK);
    }

    @GetMapping("/averageTime/{priority}")
    public ResponseEntity<String> getAverageTimeByPriority(@PathVariable String priority) {
        String averageTime = service.calculateAverageTimeByPriority(priority);
        return new ResponseEntity<>(averageTime, HttpStatus.OK);
    }

}

