package com.todo.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.EnumSet;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;

    private void validateNewTask(Task task) {
        if (task.getId() != null && repository.checkIfTaskExists(task.getId()))
            throw new IllegalArgumentException("Task already exists.");

        if (task.getName() == null || task.getName().trim().isEmpty())
            throw new IllegalArgumentException("Task text is required.");

        if (task.getName().length() > 120)
            throw new IllegalArgumentException("Task text cannot exceed 120 characters.");

        if (task.getPriority() == null)
            throw new IllegalArgumentException("Task priority is required.");

        if (!EnumSet.of(PriorityLevel.High, PriorityLevel.Medium, PriorityLevel.Low).contains(task.getPriority()))
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");

        if (task.isCompleted() && task.getCompletedAt() == null)
            throw new IllegalArgumentException("A completed task must have a done date.");

        if (!task.isCompleted() && task.getCompletedAt() != null)
            throw new IllegalArgumentException("An incomplete task cannot have a done date.");

        if (task.getDueDate() != null && task.getDueDate().before(new Date()))
            throw new IllegalArgumentException("Task due date cannot be in the past.");

        if (task.getCreatedAt() != null)
            throw new IllegalArgumentException("Task cannot have a proper created date.");
    }

    private void validateExistingTask(Long id, Task task) {
        if (!repository.checkIfTaskExists(id))
            throw new IllegalArgumentException("Task does not exist");

        if (task.getName() == null && task.getPriority() == null && task.getDueDate() == null)
            throw new IllegalArgumentException("At least one field (name, priority, or due date) must be provided.");

        if (task.getName() != null && task.getName().length() > 120)
            throw new IllegalArgumentException("Task text cannot exceed 120 characters.");

        if (!EnumSet.of(PriorityLevel.High, PriorityLevel.Medium, PriorityLevel.Low).contains(task.getPriority()))
            throw new IllegalArgumentException("Task priority must be High, Medium, or Low.");

        if (task.getDueDate() != null && task.getDueDate().before(new Date()))
            throw new IllegalArgumentException("Task due date cannot be in the past.");
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
        validateNewTask(task);
        return repository.createTask(task);
    }

    public List<Task> createTasks(List<Task> tasks) {
        return tasks.stream()
                .map(repository::createTask)
                .collect(Collectors.toList());
    }

    public Task updateTaskContent(Long id, Task task) {
        validateExistingTask(id, task);
        return repository.updateTaskContent(id, task);
    }

    public Task updateTaskStatus(Long id, String status) {
        if (!repository.checkIfTaskExists(id)) throw new IllegalArgumentException("Task does not exist");
        if (!Objects.equals(status, "done") && !Objects.equals(status, "undone")) throw new IllegalArgumentException("Task status is not correct");
        return repository.updateTaskStatus(id, status);
    }
}