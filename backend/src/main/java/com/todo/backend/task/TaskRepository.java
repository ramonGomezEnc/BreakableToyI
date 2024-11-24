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

    public List<Task> applySorting(List<Task> tasks, String sortBy, Boolean isDescending) {
        Comparator<Task> comparator = Comparator.naturalOrder();

        if ("priority".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(Task::getPriority);
        } else if ("dueDate".equalsIgnoreCase(sortBy)) {
            comparator = Comparator.comparing(
                    Task::getDueDate,
                    Comparator.nullsLast(Comparator.naturalOrder())
            );
        }
        if (Boolean.TRUE.equals(isDescending))  comparator = comparator.reversed();

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
}