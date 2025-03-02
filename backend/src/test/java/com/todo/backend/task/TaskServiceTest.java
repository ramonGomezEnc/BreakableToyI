package com.todo.backend.task;

import com.todo.backend.task.dto.TaskDTO;
import com.todo.backend.task.dto.TaskResponseDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @InjectMocks
    private TaskService service;

    @Mock
    private TaskRepository repository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldGetAllTasks() {
        Task task = new Task(1L, "Test Task", PriorityLevel.High, false, new Date(), null, null);
        when(repository.findAll()).thenReturn(Collections.singletonList(task));
        when(repository.applyFiltering(any(), any(), any(), any())).thenReturn(Collections.singletonList(task));
        when(repository.applySorting(any(), any(), any())).thenReturn(Collections.singletonList(task));
        when(repository.applyPagination(any(), eq(0))).thenReturn(Collections.singletonList(task));

        List<TaskResponseDTO> response = service.getTasks(null, null, null, null, null, 0);

        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals("Test Task", response.get(0).getName());
        verify(repository, times(1)).findAll();
    }

    @Test
    void shouldCreateTask() {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setName("Test Task");
        taskDTO.setPriority("Medium");
        taskDTO.setCompleted(false);
        taskDTO.setDueDate(null);

        Task createdTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);

        when(repository.save(any(Task.class))).thenReturn(createdTask);

        TaskResponseDTO result = service.createTask(taskDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test Task", result.getName());
        verify(repository, times(1)).save(any(Task.class));
    }

    @Test
    void shouldUpdateTaskContent() {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setName("Updated Task");
        taskDTO.setPriority("Low");
        taskDTO.setCompleted(false);
        taskDTO.setDueDate(null);

        Task existingTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);
        Task updatedTask = new Task(1L, "Updated Task", PriorityLevel.Low, false, new Date(), null, null);

        when(repository.findById(1L)).thenReturn(Optional.of(existingTask));
        when(repository.save(any(Task.class))).thenReturn(updatedTask);

        TaskResponseDTO result = service.updateTaskContent(1L, taskDTO);

        assertNotNull(result);
        assertEquals("Updated Task", result.getName());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(any(Task.class));
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentTask() {
        TaskDTO taskDTO = new TaskDTO();
        taskDTO.setName("Updated Task");
        taskDTO.setPriority("Low");
        taskDTO.setCompleted(false);
        taskDTO.setDueDate(null);

        when(repository.findById(1L)).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.updateTaskContent(1L, taskDTO)
        );

        assertEquals("Task not found", exception.getMessage());
        verify(repository, times(1)).findById(1L);
        verify(repository, never()).save(any(Task.class));
    }

    @Test
    void shouldDeleteTask() {
        Task existingTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);

        when(repository.existsById(1L)).thenReturn(true); // Ensure this is correctly mocked
        doNothing().when(repository).deleteById(1L);

        String result = service.deleteTask(1L);

        assertEquals("The task was deleted", result);
        verify(repository, times(1)).deleteById(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentTask() {
        when(repository.existsById(1L)).thenReturn(false); // Ensure proper mock

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.deleteTask(1L)
        );

        assertEquals("Task does not exist", exception.getMessage());
        verify(repository, never()).deleteById(anyLong());
    }

    @Test
    void shouldCheckTaskAsDone() {
        Task existingTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);
        Task updatedTask = new Task(1L, "Test Task", PriorityLevel.Medium, true, new Date(), new Date(), null);

        // Ensure `findById` returns a valid task
        when(repository.findById(1L)).thenReturn(Optional.of(existingTask));
        when(repository.save(any(Task.class))).thenReturn(updatedTask);

        TaskResponseDTO result = service.updateTaskStatus(1L, "done");

        assertNotNull(result);
        assertTrue(result.isCompleted());
        assertNotNull(result.getCompletedAt());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(any(Task.class));
    }


    @Test
    void shouldCheckTaskAsUndone() {
        Task existingTask = new Task(1L, "Test Task", PriorityLevel.Medium, true, new Date(), new Date(), null);
        Task updatedTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);

        when(repository.findById(1L)).thenReturn(Optional.of(existingTask));
        when(repository.save(any(Task.class))).thenReturn(updatedTask);

        TaskResponseDTO result = service.updateTaskStatus(1L, "undone");

        assertNotNull(result);
        assertFalse(result.isCompleted());
        assertNull(result.getCompletedAt());
        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(any(Task.class));
    }


    @Test
    void shouldSortAndFilterTasks() {
        Task task1 = new Task(1L, "Task A", PriorityLevel.Low, false, null, null, null);
        Task task2 = new Task(2L, "Task B", PriorityLevel.High, false, null, null, null);

        List<Task> tasks = List.of(task1, task2);

        when(repository.findAll()).thenReturn(tasks);
        when(repository.applyFiltering(anyList(), eq("Task B"), String.valueOf(eq(PriorityLevel.High)), eq(true)))
                .thenReturn(Collections.singletonList(task2)); // Ensure PriorityLevel, not String
        when(repository.applySorting(anyList(), eq("priority"), eq("asc")))
                .thenReturn(Collections.singletonList(task2));
        when(repository.applyPagination(anyList(), eq(0)))
                .thenReturn(Collections.singletonList(task2));

        List<TaskResponseDTO> response = service.getTasks(
                "Task B",
                "High",
                true,
                "priority",
                "asc",
                0
        );

        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals("Task B", response.get(0).getName());
        assertEquals(PriorityLevel.High.name(), response.get(0).getPriority()); // Ensure proper type
    }

    @Test
    void shouldPaginateTasks() {
        Task task1 = new Task(1L, "Task 1", PriorityLevel.Low, false, null, null, null);
        Task task2 = new Task(2L, "Task 2", PriorityLevel.High, false, null, null, null);

        List<Task> tasks = List.of(task1, task2);
        when(repository.findAll()).thenReturn(tasks);
        when(repository.applyFiltering(anyList(), any(), any(), any())).thenReturn(tasks);
        when(repository.applySorting(anyList(), any(), any())).thenReturn(tasks);
        when(repository.applyPagination(anyList(), eq(1))).thenReturn(Collections.singletonList(task2));

        List<TaskResponseDTO> response = service.getTasks(null, null, null, null, null, 1);

        assertNotNull(response);
        assertEquals(1, response.size());
        assertEquals("Task 2", response.get(0).getName());
        verify(repository, times(1)).findAll();
        verify(repository, times(1)).applyPagination(anyList(), eq(1));
    }
}