package com.todo.backend.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    // Filters tasks based on name, priority, and completion status
    default List<Task> applyFiltering(List<Task> tasks, String nameFilter, String priorityFilter, Boolean isCompletedFilter) {
        return tasks.stream()
            .filter(task -> isCompletedFilter == null || task.isCompleted() == isCompletedFilter)
            .filter(task -> nameFilter == null || task.getName().toLowerCase().contains(nameFilter.toLowerCase()))
            .filter(task -> priorityFilter == null || task.getPriority().toString().equalsIgnoreCase(priorityFilter))
            .collect(Collectors.toList());
    }

    // Sorts tasks based on specified criteria
    default List<Task> applySorting(List<Task> tasks, String sortBy, String order) {
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

    // Applies pagination to the list of tasks
    default List<Task> applyPagination(List<Task> tasks, int page) {
        final int DEFAULT_PAGE_SIZE = 10;
        return tasks.stream()
            .skip((long) page * DEFAULT_PAGE_SIZE)
            .limit(DEFAULT_PAGE_SIZE)
            .collect(Collectors.toList());
    }
}