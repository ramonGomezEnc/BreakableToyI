package com.todo.backend.task;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.Date;
import java.util.List;

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
        when(repository.fetchTasks()).thenReturn(Collections.singletonList(task));
        when(repository.applyFiltering(any(), any(), any(), any())).thenReturn(Collections.singletonList(task));
        when(repository.applySorting(any(), any(), any())).thenReturn(Collections.singletonList(task));
        when(repository.applyPagination(any(), eq(0))).thenReturn(Collections.singletonList(task));

        TaskResponse response = service.getTasks(null, null, null, null, null, 0);

        assertNotNull(response);
        assertEquals(1, response.getTasks().size());
        assertEquals("Test Task", response.getTasks().getFirst().getName());
        verify(repository, times(1)).fetchTasks();
    }

    @Test
    void shouldCreateTask() {
        Task task = new Task(null, "Test Task", PriorityLevel.Medium, false, null, null, null);
        Task createdTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, new Date(), null, null);

        when(repository.createTask(any(Task.class))).thenReturn(createdTask);

        Task result = service.createTask(task);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Test Task", result.getName());
        verify(repository, times(1)).createTask(any(Task.class));
    }

    @Test
    void shouldUpdateTaskContent() {
        Task updatedTask = new Task(1L, "Updated Task", PriorityLevel.Low, false, null, null, null);

        when(repository.checkIfTaskExists(1L)).thenReturn(true);
        when(repository.updateTaskContent(eq(1L), any(Task.class))).thenReturn(updatedTask);

        Task result = service.updateTaskContent(1L, updatedTask);

        assertNotNull(result);
        assertEquals("Updated Task", result.getName());
        verify(repository, times(1)).checkIfTaskExists(1L);
        verify(repository, times(1)).updateTaskContent(eq(1L), any(Task.class));
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentTask() {
        Task updatedTask = new Task(1L, "Updated Task", PriorityLevel.Low, false, new Date(), null, null);

        when(repository.checkIfTaskExists(1L)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.updateTaskContent(1L, updatedTask)
        );

        assertEquals("Task does not exist", exception.getMessage());
        verify(repository, times(1)).checkIfTaskExists(1L);
        verify(repository, never()).updateTaskContent(anyLong(), any(Task.class));
    }

    @Test
    void shouldDeleteTask() {
        when(repository.checkIfTaskExists(1L)).thenReturn(true);
        doNothing().when(repository).deleteTask(1L);

        String result = service.deleteTask(1L);

        assertEquals("The task was deleted", result);
        verify(repository, times(1)).deleteTask(1L);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentTask() {
        when(repository.checkIfTaskExists(1L)).thenReturn(false);

        IllegalArgumentException exception = assertThrows(
                IllegalArgumentException.class,
                () -> service.deleteTask(1L)
        );


        assertEquals("Task does not exist", exception.getMessage());
        verify(repository, times(1)).checkIfTaskExists(1L);
        verify(repository, never()).deleteTask(anyLong());
    }

    @Test
    void shouldCheckTaskAsDone() {
        Task updatedTask = new Task(1L, "Test Task", PriorityLevel.Medium, true, null, new Date(), null);

        when(repository.checkIfTaskExists(1L)).thenReturn(true);
        when(repository.updateTaskStatus(1L, "done")).thenReturn(updatedTask);

        Task result = service.updateTaskStatus(1L, "done");

        assertNotNull(result);
        assertTrue(result.isCompleted());
        assertNotNull(result.getCompletedAt());
        verify(repository, times(1)).checkIfTaskExists(1L);
        verify(repository, times(1)).updateTaskStatus(1L, "done");
    }

    @Test
    void shouldCheckTaskAsUndone() {
        Task updatedTask = new Task(1L, "Test Task", PriorityLevel.Medium, false, null, null, null);

        when(repository.checkIfTaskExists(1L)).thenReturn(true);
        when(repository.updateTaskStatus(1L, "undone")).thenReturn(updatedTask);

        Task result = service.updateTaskStatus(1L, "undone");

        assertNotNull(result);
        assertFalse(result.isCompleted());
        assertNull(result.getCompletedAt());
        verify(repository, times(1)).checkIfTaskExists(1L);
        verify(repository, times(1)).updateTaskStatus(1L, "undone");
    }

    @Test
    void shouldSortAndFilterTasks() {
        Task task1 = new Task(1L, "Task A", PriorityLevel.Low, false, null, null, null);
        Task task2 = new Task(2L, "Task B", PriorityLevel.High, false, null, null, null);
        Task task3 = new Task(3L, "Task C", PriorityLevel.Medium, true, null, null, null);

        List<Task> tasks = List.of(task1, task2, task3);

        when(repository.fetchTasks()).thenReturn(tasks);
        when(repository.applyFiltering(anyList(), eq("Task B"), eq("High"), eq(true)))
                .thenReturn(Collections.singletonList(task2));
        when(repository.applySorting(anyList(), eq("priority"), eq("asc")))
                .thenReturn(Collections.singletonList(task2));
        when(repository.applyPagination(anyList(), eq(0)))
                .thenReturn(Collections.singletonList(task2));

        TaskResponse response = service.getTasks(
                "Task B",
                "High",
                true,
                "priority",
                "asc",
                0
        );

        assertNotNull(response);
        assertEquals(1, response.getTasks().size());
        assertEquals("Task B", response.getTasks().getFirst().getName());
        assertEquals(PriorityLevel.High, response.getTasks().getFirst().getPriority());
        assertFalse(response.getTasks().getFirst().isCompleted());

        verify(repository, times(1)).fetchTasks();
        verify(repository, times(1)).applyFiltering(anyList(), eq("Task B"), eq("High"), eq(true));
        verify(repository, times(1)).applySorting(anyList(), eq("priority"), eq("asc"));
        verify(repository, times(1)).applyPagination(anyList(), eq(0));
    }



    @Test
    void shouldPaginateTasks() {
        Task task1 = new Task(1L, "Task 1", PriorityLevel.Low, false, null, null, null);
        Task task2 = new Task(2L, "Task 2", PriorityLevel.High, false, null, null, null);

        List<Task> tasks = List.of(task1, task2);
        when(repository.fetchTasks()).thenReturn(tasks);
        when(repository.applyFiltering(anyList(), any(), any(), any())).thenReturn(tasks);
        when(repository.applySorting(anyList(), any(), any())).thenReturn(tasks);
        when(repository.applyPagination(anyList(), eq(1))).thenReturn(Collections.singletonList(task2));

        TaskResponse response = service.getTasks(null, null, null, null, null, 1);

        assertNotNull(response);
        assertEquals(1, response.getTasks().size());
        assertEquals("Task 2", response.getTasks().getFirst().getName());
        verify(repository, times(1)).fetchTasks();
        verify(repository, times(1)).applyPagination(anyList(), eq(1));
    }
}