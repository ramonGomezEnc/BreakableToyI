package com.todo.backend.task;

import com.todo.backend.task.dto.TaskDTO;
import com.todo.backend.task.dto.TaskListResponseDTO;
import com.todo.backend.task.dto.TaskResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;

    private static final Set<String> VALID_PRIORITIES = Set.of("High", "Medium", "Low");

    @Autowired
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    // Validate the task DTO
    private void validateTask(TaskDTO taskDTO) {
        if (taskDTO.getName().length() > 120) {
            throw new IllegalArgumentException("Task text cannot exceed 120 characters.");
        }

        if (!VALID_PRIORITIES.contains(taskDTO.getPriority())) {
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");
        }
    }

    // Calculate the average time for tasks
    private String calculateAverage(List<Task> tasks) {
        if (tasks.isEmpty()) return "0:00";

        long totalDurationMillis = tasks.stream()
                .filter(task -> task.getCreatedAt() != null && task.getCompletedAt() != null)
                .mapToLong(task -> task.getCompletedAt().getTime() - task.getCreatedAt().getTime())
                .sum();

        long averageMillis = totalDurationMillis / tasks.size();
        long totalSeconds = averageMillis / 1000;
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;

        return String.format("%d:%02d", minutes, seconds);
    }

    // Get tasks with filtering, sorting, and pagination
    public TaskListResponseDTO getTasks(String nameFilter, String priorityFilter, Boolean isCompletedFilter, String sortBy, String order, int page) {
        List<Task> allTasks = repository.findAll();
        allTasks = repository.applyFiltering(allTasks, nameFilter, priorityFilter, isCompletedFilter);
        allTasks = repository.applySorting(allTasks, sortBy, order);
        allTasks = repository.applyPagination(allTasks, page);
        List<TaskResponseDTO> taskResponseDTOs = allTasks.stream()
                .map(TaskConverter::convertToDTO)
                .collect(Collectors.toList());
        return new TaskListResponseDTO(taskResponseDTOs, allTasks.size());
    }

    // Create a new task
    public TaskResponseDTO createTask(TaskDTO taskDTO) {
        validateTask(taskDTO);
        Task task = TaskConverter.convertToEntity(taskDTO);
        task.setCreatedAt(new Date());
        task.setCompleted(false);
        task.setCompletedAt(null);
        Task savedTask = repository.save(task);
        return TaskConverter.convertToDTO(savedTask);
    }

    // Update task content
    public TaskResponseDTO updateTaskContent(Long id, TaskDTO taskDTO) {
        validateTask(taskDTO);
        Task existingTask = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));
        if (taskDTO.getName() != null) existingTask.setName(taskDTO.getName());
        existingTask.setDueDate(taskDTO.getDueDate());
        if (taskDTO.getPriority() != null) existingTask.setPriority(PriorityLevel.valueOf(taskDTO.getPriority()));
        Task updatedTask = repository.save(existingTask);
        return TaskConverter.convertToDTO(updatedTask);
    }

    // Update task status
    public TaskResponseDTO updateTaskStatus(Long id, String status) {
        Task existingTask = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Task not found"));

        if ("done".equalsIgnoreCase(status)) {
            existingTask.setCompleted(true);
            existingTask.setCompletedAt(new Date());
        } else if ("undone".equalsIgnoreCase(status)) {
            existingTask.setCompleted(false);
            existingTask.setCompletedAt(null);
        } else {
            throw new IllegalArgumentException("Task status is not correct");
        }

        Task updatedTask = repository.save(existingTask);
        return TaskConverter.convertToDTO(updatedTask);
    }

    // Delete a task
    public String deleteTask(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Task does not exist");
        }
        repository.deleteById(id);
        return "The task was deleted";
    }

    // Calculate average time for all tasks
    public String calculateAverageTime() {
        List<Task> tasks = repository.findAll();
        return calculateAverage(tasks);
    }

    // Calculate average time for tasks by priority
    public String calculateAverageTimeByPriority(String priority) {
        if (!VALID_PRIORITIES.contains(priority)) {
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");
        }

        List<Task> tasksByPriority = repository.findAll();
        tasksByPriority = repository.applyFiltering(tasksByPriority, null, priority, null);
        return calculateAverage(tasksByPriority);
    }
}