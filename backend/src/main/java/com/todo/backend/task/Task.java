package com.todo.backend.task;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;

import java.util.Date;
import java.util.Optional;

enum PriorityLevel { High, Medium, Low }

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task implements Comparable<Task> {
    private Long id;
    private String name;
    private PriorityLevel priority;
    private boolean completed;
    private Date createdAt;
    private Date completedAt;
    private Optional<Date> dueDate = Optional.empty();

    @Override
    public int compareTo(@NotNull Task o) {
        if (this.id == null && o.id == null) return 0;
        if (this.id == null) return -1;
        if (o.id == null) return 1;
        return this.id.compareTo(o.id);
    }
}
