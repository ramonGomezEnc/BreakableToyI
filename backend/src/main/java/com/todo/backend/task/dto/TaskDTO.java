package com.todo.backend.task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private String name;
    private String priority;
    private boolean isCompleted;
    private Date dueDate;
}