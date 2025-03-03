package com.todo.backend.task.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
public class TaskListResponseDTO {
    private List<TaskResponseDTO> tasks;
    private int totalSize;

    public TaskListResponseDTO(List<TaskResponseDTO> tasks, int totalSize) {
        this.tasks = tasks;
        this.totalSize = totalSize;
    }
}