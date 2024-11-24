package com.todo.backend.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repository;

    @Autowired
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getTasks(String nameFilter, String priorityFilter, Boolean isCompletedFilter, String sortBy, Boolean isDescending, int page) {
        List<Task> allTasks = repository.fetchTasks();
        allTasks = repository.applyFiltering(allTasks, nameFilter, priorityFilter, isCompletedFilter);
        allTasks = repository.applySorting(allTasks, sortBy, isDescending);
        return repository.applyPagination(allTasks, page);
    }
}
