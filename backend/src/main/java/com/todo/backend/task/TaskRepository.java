package com.todo.backend.task;

import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Repository
public class TaskRepository {
    private final HashMap<Long, Task> tasks = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);
    private static final int DEFAULT_PAGE_SIZE = 10;

    public List<Task> fetchTasks() {
        return new ArrayList<>(tasks.values());
    }

    public List<Task> applyFiltering(List<Task> tasks, String nameFilter, String priorityFilter, Boolean isCompletedFilter) {
        return tasks.stream()
            .filter(task -> isCompletedFilter == null || task.isCompleted() == isCompletedFilter)
            .filter(task -> nameFilter == null || task.getName().toLowerCase().contains(nameFilter.toLowerCase()))
            .filter(task -> priorityFilter == null || task.getPriority().toString().equalsIgnoreCase(priorityFilter))
            .collect(Collectors.toList());
    }

    public List<Task> applySorting(List<Task> tasks, String sortBy, String order) {
        Comparator<Task> comparator = Comparator.naturalOrder();

        if ("priority".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(Task::getPriority);
        } else if ("dueDate".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(
                    Task::getDueDate,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
        }
        if (Objects.equals(order, "desc")) comparator = comparator.reversed();

        return tasks.stream()
            .sorted(comparator)
            .collect(Collectors.toList());
    }

    public List<Task> applyPagination(List<Task> tasks, int page) {
        return tasks.stream()
            .skip((long) page * DEFAULT_PAGE_SIZE)
            .limit(DEFAULT_PAGE_SIZE)
            .collect(Collectors.toList());
    }

    public Task createTask(Task task) {
        task.setId(idGenerator.getAndIncrement());
        task.setCreatedAt(new Date());
        task.setCompleted(false);
        task.setCompletedAt(null);
        tasks.put(task.getId(), task);
        return task;
    }

    public Boolean checkIfTaskExists(Long id) {
        return tasks.containsKey(id);
    }

    public Task updateTaskContent(Long id, Task task) {
        Task existingTask = tasks.get(id);
        if (task.getName() != null) existingTask.setName(task.getName());
        existingTask.setDueDate(task.getDueDate());
        if (task.getPriority() != null) existingTask.setPriority(task.getPriority());
        tasks.put(id, existingTask);
        return existingTask;
    }

    public Task updateTaskStatus(Long id, String status) {
        Task existingTask = tasks.get(id);
        if (Objects.equals(status, "done") ) {
            existingTask.setCompleted(true);
            existingTask.setCompletedAt(new Date());
        } else if (Objects.equals(status, "undone") ) {
            existingTask.setCompleted(false);
            existingTask.setCompletedAt(null);
        }
        tasks.put(id, existingTask);
        return existingTask;
    }

    public void deleteTask(Long id) {
        tasks.remove(id);
    }
}