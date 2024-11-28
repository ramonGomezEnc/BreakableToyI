package com.todo.backend.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponse {
    private List<Task> tasks;
    private Integer totalSize;
}
