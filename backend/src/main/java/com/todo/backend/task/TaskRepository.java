package com.todo.backend.task;

import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class TaskRepository {
    private final HashMap<Long, Task> tasks = new HashMap<>();
    private final AtomicLong idGenerator = new AtomicLong(1);

    public TaskRepository() {
        tasks.put(1L, new Task(
                1L,
                "Complete Spring Boot project",
                PriorityLevel.High,
                false,
                new Date(),
                null,
                new Date(System.currentTimeMillis() + 86400000L) // Due tomorrow
        ));

        tasks.put(2L, new Task(
                2L,
                "Prepare presentation slides",
                PriorityLevel.Medium,
                true,
                new Date(System.currentTimeMillis() - 172800000L), // Created 2 days ago
                new Date(System.currentTimeMillis() - 86400000L),  // Completed 1 day ago
                new Date(System.currentTimeMillis() - 86400000L)   // Due yesterday
        ));

        tasks.put(3L, new Task(
                3L,
                "Organize team meeting",
                PriorityLevel.Low,
                false,
                new Date(),
                null,
                new Date(System.currentTimeMillis() + 259200000L) // Do in 3 days
        ));
    }

    public List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

}