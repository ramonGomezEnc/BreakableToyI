package com.todo.backend.task;

import com.todo.backend.task.dto.TaskDTO;
import com.todo.backend.task.dto.TaskResponseDTO;

public class TaskConverter {

    // Convert TaskDTO to Task entity
    public static Task convertToEntity(TaskDTO taskDTO) {
        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setPriority(PriorityLevel.valueOf(taskDTO.getPriority()));
        task.setCompleted(taskDTO.isCompleted());
        task.setDueDate(taskDTO.getDueDate());
        return task;
    }

    // Convert Task entity to TaskResponseDTO
    public static TaskResponseDTO convertToDTO(Task task) {
        TaskResponseDTO taskDTO = new TaskResponseDTO();
        taskDTO.setId(task.getId());
        taskDTO.setName(task.getName());
        taskDTO.setPriority(task.getPriority().name());
        taskDTO.setCompleted(task.isCompleted());
        taskDTO.setCreatedAt(task.getCreatedAt());
        taskDTO.setCompletedAt(task.getCompletedAt());
        taskDTO.setDueDate(task.getDueDate());
        return taskDTO;
    }
}