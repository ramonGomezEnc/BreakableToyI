package com.todo.backend.task;

import com.todo.backend.task.dto.TaskDTO;
import com.todo.backend.task.dto.TaskResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/todos")
public class TaskController {
    private final TaskService service;

    @Autowired
    public TaskController(TaskService service) {
        this.service = service;
    }

    // Retrieves all tasks with optional filtering, sorting, and pagination
    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean isCompleted,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order,
            @RequestParam(defaultValue = "0") int page) {
        return new ResponseEntity<>(service.getTasks(name, priority, isCompleted, sortBy, order, page), HttpStatus.OK);
    }

    // Creates a new task
    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@RequestBody TaskDTO payload) {
        return new ResponseEntity<>(service.createTask(payload), HttpStatus.CREATED);
    }

    // Updates task content
    @PutMapping("/{taskId}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long taskId, @RequestBody TaskDTO payload) {
        return new ResponseEntity<>(service.updateTaskContent(taskId, payload), HttpStatus.OK);
    }

    // Updates task completion status
    @PatchMapping("/{taskId}/{status}")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(@PathVariable Long taskId, @PathVariable String status) {
        return new ResponseEntity<>(service.updateTaskStatus(taskId, status), HttpStatus.OK);
    }

    // Deletes a task
    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        return new ResponseEntity<>(service.deleteTask(taskId), HttpStatus.OK);
    }

    // Calculates and returns the average time taken to complete tasks
    @GetMapping("/averageTime")
    public ResponseEntity<String> getAverageTime() {
        String averageTime = service.calculateAverageTime();
        return new ResponseEntity<>(averageTime, HttpStatus.OK);
    }

    // Calculates and returns the average completion time for tasks with a specific priority (High, Medium, Low)
    @GetMapping("/averageTime/{priority}")
    public ResponseEntity<String> getAverageTimeByPriority(@PathVariable String priority) {
        String averageTime = service.calculateAverageTimeByPriority(priority);
        return new ResponseEntity<>(averageTime, HttpStatus.OK);
    }
}