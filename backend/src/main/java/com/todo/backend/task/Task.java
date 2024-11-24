package com.todo.backend.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

enum PriorityLevel { High, Medium, Low }

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    private Long id;
    private String name;
    private PriorityLevel priority;
    private boolean completed;
    private Date createdAt;
    private Date completedAt;
    private Date dueDate;
}
