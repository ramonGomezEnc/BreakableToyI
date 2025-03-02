package com.todo.backend.task.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TaskDTO {
    private String name;
    private String priority;
    private boolean isCompleted;
    private Date dueDate;
}