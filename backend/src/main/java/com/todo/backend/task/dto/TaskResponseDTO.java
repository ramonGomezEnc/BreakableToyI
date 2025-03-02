package com.todo.backend.task.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TaskResponseDTO {
    private Long id;
    private String name;
    private String priority;
    private boolean isCompleted;
    private Date createdAt;
    private Date completedAt;
    private Date dueDate;
}