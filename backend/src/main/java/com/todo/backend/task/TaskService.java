package com.todo.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;

    private void validateTask(Task task) {
        if (task.getName().length() > 120)
            throw new IllegalArgumentException("Task text cannot exceed 120 characters.");

        if (!EnumSet.of(PriorityLevel.High, PriorityLevel.Medium, PriorityLevel.Low).contains(task.getPriority()))
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");

        if (task.getCreatedAt() != null)
            throw new IllegalArgumentException("Task cannot have a proper created date.");

        if (task.getCompletedAt() != null)
            throw new IllegalArgumentException("Task cannot have a proper completed date.");

        if (task.isCompleted())
            throw new IllegalArgumentException("Task cannot be completed.");
    }

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

    @Autowired
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getTasks(String nameFilter, String priorityFilter, Boolean isCompletedFilter, String sortBy, String order, int page) {
        List<Task> allTasks = repository.fetchTasks();
        allTasks = repository.applyFiltering(allTasks, nameFilter, priorityFilter, isCompletedFilter);
        allTasks = repository.applySorting(allTasks, sortBy, order);
        return repository.applyPagination(allTasks, page);
    }

    public Task createTask(Task task) {
        if (task.getId() != null && repository.checkIfTaskExists(task.getId()))
            throw new IllegalArgumentException("Task already exists.");

        if (task.getName() == null || task.getName().trim().isEmpty())
            throw new IllegalArgumentException("Task text is required.");

        if (task.getPriority() == null)
            throw new IllegalArgumentException("Task priority is required.");

        validateTask(task);
        return repository.createTask(task);
    }

    public List<Task> createTasks(List<Task> tasks) {
        return tasks.stream()
                .map(repository::createTask)
                .collect(Collectors.toList());
    }

    public Task updateTaskContent(Long id, Task task) {
        if (!repository.checkIfTaskExists(id))
            throw new IllegalArgumentException("Task does not exist");
        validateTask(task);
        return repository.updateTaskContent(id, task);
    }

    public Task updateTaskStatus(Long id, String status) {
        if (!repository.checkIfTaskExists(id)) throw new IllegalArgumentException("Task does not exist");
        if (!Objects.equals(status, "done") && !Objects.equals(status, "undone")) throw new IllegalArgumentException("Task status is not correct");
        return repository.updateTaskStatus(id, status);
    }

    public String deleteTask(Long id) {
        repository.deleteTask(id);
        return "The task was deleted";
    }

    public String calculateAverageTime() {
        List<Task> tasks = repository.fetchTasks();
        return calculateAverage(tasks);
    }

    public String calculateAverageTimeByPriority(String priority) {
        if (!Set.of("High", "Medium", "Low").contains(priority))
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");

        List<Task> tasksByPriority = repository.fetchTasks();
        tasksByPriority = repository.applyFiltering(tasksByPriority, null, priority, null);
        return calculateAverage(tasksByPriority);
    }
}