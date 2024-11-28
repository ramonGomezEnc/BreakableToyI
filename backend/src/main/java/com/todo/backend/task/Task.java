package com.todo.backend.task;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.util.Date;

enum PriorityLevel { High, Medium, Low }

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Task implements Comparable<Task> {
    private Long id;
    private String name;
    private PriorityLevel priority;
    private boolean isCompleted;
    private Date createdAt;
    private Date completedAt;
    private Date dueDate;

    @Override
    public int compareTo(@NotNull Task o) {
        if (this.id == null && o.id == null) return 0;
        if (this.id == null) return -1;
        if (o.id == null) return 1;
        return this.id.compareTo(o.id);
    }
}
